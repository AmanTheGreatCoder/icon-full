import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { CartService } from 'src/modules/user/cart/cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderQueryDto, UpdateOrderStatusDto } from './dto/dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
  ) {}

  async getAllOrders(query: OrderQueryDto) {
    const where = {
      ...(query.search && {
        OR: [
          { orderNumber: { contains: query.search } },
          {
            user: {
              OR: [
                {
                  firstName: {
                    contains: query.search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  lastName: {
                    contains: query.search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            },
          },
        ],
      }),
      ...(query.status && { status: query.status }),
      ...(query.startDate &&
        query.endDate && {
          createdAt: {
            gte: query.startDate,
            lte: query.endDate,
          },
        }),
    };

    return this.prisma.order.findMany({
      where,
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async createOrder(userId: string) {
    const cart = await this.cartService.findByUserId(userId);

    if (!cart) {
      throw new NotFoundException('No items in cart');
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
        user: true,
      },
    });

    await Promise.all(
      cart.items.map((item) =>
        this.prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        }),
      ),
    );

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    await this.prisma.cart.delete({
      where: { id: cart.id },
    });

    return order;
  }

  async updateOrderStatus(id: string, data: UpdateOrderStatusDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status: data.status,
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async checkout(id: string) {}

  async deleteOrder(id: string) {
    await this.prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    return this.prisma.order.delete({
      where: { id },
    });
  }

  async getOrderStats() {
    const [totalOrders, totalRevenue, statusCounts, recentOrders] =
      await Promise.all([
        this.prisma.order.count(),
        this.prisma.order.aggregate({
          _sum: {
            totalAmount: true,
          },
          where: {
            status: {
              not: OrderStatus.CANCELLED,
            },
          },
        }),
        this.prisma.order.groupBy({
          by: ['status'],
          _count: true,
        }),
        this.prisma.order.findMany({
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        }),
      ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount,
      statusCounts,
      recentOrders,
    };
  }
}
