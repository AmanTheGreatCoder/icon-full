import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddToCartDto,
  CheckoutDto,
  CouponDto,
  RemoveFromCartDto,
  UpdateCartItemDto,
} from './dto/dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async applyCoupon(userId: string, dto: CouponDto) {
    const cart = await this.findByUserId(userId);
    const coupon = await this.prisma.coupon.findUnique({
      where: {
        code: dto.code,
        isActive: true,
        validTo: { gt: new Date() },
        validFrom: { lte: new Date() },
      },
    });

    if (!coupon) {
      throw new BadRequestException('Invalid or expired coupon');
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      throw new BadRequestException('Coupon usage limit exceeded');
    }

    const subtotal = await this.calculateSubtotal(cart.id);

    if (coupon.minAmount && subtotal < coupon.minAmount) {
      throw new BadRequestException(
        `Minimum order amount of ${coupon.minAmount} required`,
      );
    }

    return this.prisma.cart.update({
      where: { id: cart.id },
      data: {
        couponId: coupon.id,
        discount: this.calculateDiscount(subtotal, coupon),
      },
      include: { items: { include: { product: true } } },
    });
  }

  async deleteCart(userId: string) {
    return this.prisma.cart.delete({
      where: { userId },
    });
  }

  async checkout(userId: string, dto: CheckoutDto) {
    const cart = await this.findByUserId(userId);

    if (!cart.items.length) {
      throw new BadRequestException('Cart is empty');
    }

    const order = await this.prisma.order.create({
      data: {
        orderNumber: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
        userId,
        addressId: cart.addressId,
        totalAmount: cart.totalAmount,
        subtotal: new Decimal(cart.subtotal),
        discount: cart.discount,
        status: 'PENDING',
        couponId: cart.couponId,
        voucherId: cart.voucherId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
    });

    await this.prisma.cart.delete({
      where: { id: cart.id },
    });

    return order;
  }

  async calculateSubtotal(cartId: string): Promise<number> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return cart.items.reduce((sum, item) => {
      const price = item.product.price;
      return sum + price.toNumber() * item.quantity;
    }, 0);
  }

  private calculateDiscount(subtotal: number, coupon: any): Decimal {
    let discount = new Decimal(0);
    if (coupon.type === 'PERCENTAGE') {
      discount = new Decimal(subtotal).mul(coupon.value).div(100);
    } else {
      discount = coupon.value;
    }

    if (coupon.maxDiscount) {
      discount = Decimal.min(discount, coupon.maxDiscount);
    }
    return discount;
  }

  async findByUserId(userId: string) {
    const cart = this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        coupon: true,
        voucher: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async getCart(userId: string) {
    return this.prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        address: true,
        items: {
          include: {
            product: true,
          },
        },
        coupon: true,
        voucher: true,
      },
    });
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < dto.quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    let cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
        include: { items: true },
      });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: dto.productId,
      },
    });

    if (existingItem) {
      return this.updateCartItem(existingItem.id, {
        quantity: dto.quantity,
      });
    }

    await this.prisma.cartItem.create({
      data: {
        quantity: dto.quantity,
        product: { connect: { id: dto.productId } },
        cart: { connect: { id: cart.id } },
      },
    });

    return await this.updateCartTotals(cart.id);
  }

  async updateCartItem(cartItemId: string, dto: UpdateCartItemDto) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.product.stock < dto.quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    const updated = await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: dto.quantity },
    });

    await this.updateCartTotals(cartItem.cartId);
    return updated;
  }

  private async updateCartTotals(cartId: string) {
    const subtotal = await this.calculateSubtotal(cartId);
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { coupon: true },
    });

    const discount = cart.coupon
      ? this.calculateDiscount(subtotal, cart.coupon)
      : new Decimal(0);

    return this.prisma.cart.update({
      where: { id: cartId },
      data: {
        subtotal: new Decimal(subtotal),
        totalAmount: new Decimal(subtotal).sub(discount),
        discount,
      },
    });
  }

  async removeFromCart(userId: string, dto: RemoveFromCartDto) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: dto.cartId,
          productId: dto.productId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.quantity === 1) {
      await this.removeCartItem(cartItem.id);
    } else {
      await this.updateCartItem(cartItem.id, {
        quantity: dto.quantity,
      });
    }
    return cartItem;
  }

  async removeCartItem(cartItemId: string) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    const deleted = await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    await this.updateCartTotals(cartItem.cartId);
    return deleted;
  }
}
