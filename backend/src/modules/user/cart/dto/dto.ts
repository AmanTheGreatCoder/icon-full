import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    description: 'ID of the product to add to cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({
    description: 'New quantity of the cart item',
    example: 2,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}

export class CheckoutDto {
  orderId;

  @ApiProperty({
    description: 'Payment ID from the payment provider',
    example: 'pay_123456789',
  })
  @IsNotEmpty()
  @IsString()
  paymentId: string;
}

export class CouponDto {
  @ApiProperty({
    description: 'Coupon code to apply to the cart',
    example: 'WELCOME10',
  })
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class RemoveFromCartDto {
  @ApiProperty({
    description: 'ID of the cart to remove from',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  cartId: string;

  @ApiProperty({
    description: 'ID of the product to remove from cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
