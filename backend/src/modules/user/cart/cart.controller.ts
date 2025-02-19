import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JWT_HEADER } from 'src/common/utils/auth';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CartService } from './cart.service';
import {
  AddToCartDto,
  CouponDto,
  RemoveFromCartDto,
  UpdateCartItemDto,
} from './dto/dto';

@Controller('customer/cart')
@ApiTags('Customer Cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(JWT_HEADER)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@CurrentUser() user: User) {
    return this.cartService.getCart(user.id);
  }

  @Post()
  async addToCart(@Body() dto: AddToCartDto, @CurrentUser() user: User) {
    return this.cartService.addToCart(user.id, dto);
  }

  @Post('apply-coupon')
  async applyCoupon(@Body() dto: CouponDto, @CurrentUser() user: User) {
    return this.cartService.applyCoupon(user.id, dto);
  }

  @Post('remove')
  async removeFromCart(
    @Body() dto: RemoveFromCartDto,
    @CurrentUser() user: User,
  ) {
    return this.cartService.removeFromCart(user.id, dto);
  }

  @Post('order')
  async checkout(@CurrentUser() user: User, @Body() dto: any) {
    return this.cartService.checkout(user.id, dto);
  }

  @Patch('items/:itemId')
  async updateCartItem(
    @Param('itemId') id: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(id, dto);
  }

  @Delete()
  async deleteCart(@CurrentUser() user: User) {
    return this.cartService.deleteCart(user.id);
  }

  @Delete('items/:itemId')
  async removeCartItem(
    @Param('itemId') itemId: string,
    @CurrentUser() user: User,
  ) {
    return this.cartService.removeCartItem(itemId);
  }
}
