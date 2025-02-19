import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientLogError } from 'src/common/helper/error_description';
import { ApplyCouponDto } from './dto/coupons.apply.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCoupons(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) {
      throw new NotFoundException(ClientLogError.USER_NOT_FOUND);
    }

    return this.prisma.coupon.findMany({
      where: { isActive: true },
    });
  }

  async getCouponById(couponId: string) {
    return this.prisma.coupon.findUnique({
      where: { id: couponId },
    });
  }

  //TODO: need to check performance and need to make this api fast
  async applyCoupon(userId: string, dto: ApplyCouponDto) {
    const coupon = await this.prisma.coupon.findFirst({
      where: {
        code: dto.couponCode,
        isActive: true,
      },
    });

    if (!coupon) {
      throw new NotFoundException(ClientLogError.COUPON_INVALID);
    }
    if (!coupon.isActive) {
      throw new NotFoundException(ClientLogError.COUPON_NOT_ACTIVE);
    }

    const findCouponUsage = await this.prisma.userCoupon.findFirst({
      where: {
        couponId: coupon.id,
        userId: userId,
      },
    });
    if (findCouponUsage) {
      throw new NotFoundException(ClientLogError.COUPON_ALREADY_USED);
    }

    const currentDate = new Date();
    if (currentDate < coupon.validFrom || currentDate > coupon.validTo) {
      throw new NotFoundException(
        ClientLogError.COUPON_NOT_VALID_FOR_THIS_TIME,
      );
    }

    if (dto.orderAmount < coupon.minPurchaseAmount) {
      throw new NotFoundException(
        `${ClientLogError.REQ_MIN_PURCHASE}` + `${coupon.minPurchaseAmount}`,
      );
    }

    const discountAmount = (dto.orderAmount * coupon.discountPercentage) / 100;

    const totalDiscountAmount = Math.min(discountAmount, coupon.maxUsageAmount);
    const finalPrice = dto.orderAmount - totalDiscountAmount;

    await this.prisma.userCoupon.create({
      data: { userId: userId, couponId: coupon.id },
    });

    return {
      message: 'Coupon applied successfully',
      coupon: {
        code: coupon.code,
        title: coupon.title,
        maxUsageAmount: coupon.maxUsageAmount,
        minPurchaseAmount: coupon.minPurchaseAmount,
        totalDiscountAmount: -totalDiscountAmount,
        finalPrice: finalPrice,
      },
    };
  }
}
