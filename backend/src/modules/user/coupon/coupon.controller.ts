import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guard/role.guard';
import { ApiError } from 'src/common/helper/error_description';
import { JWT_HEADER } from 'src/common/utils/auth';
import { JwtAuthGuard } from 'src/modules/user/auth/guards/jwt-auth.guard';
import { CouponsService } from './coupon.service';
import { ApplyCouponDto } from './dto/coupons.apply.dto';

@Controller('customer/coupon')
@ApiTags('Customer Coupons')
@ApiBearerAuth(JWT_HEADER)
@UseGuards(JwtAuthGuard)
export class CouponsController {
  constructor(private couponsService: CouponsService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiError.SUCCESS_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiError.UNAUTHORIZED_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ApiError.BAD_REQUEST,
  })
  @ApiOperation({
    summary: 'Get all the active coupons by USER and SELLER',
    description: 'Get all the coupons by USER and SELLER',
  })
  async getAllCoupons(@Request() req) {
    const userId = req.user.id;
    return this.couponsService.getAllCoupons(userId);
  }

  @Post('apply')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiError.SUCCESS_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiError.UNAUTHORIZED_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ApiError.BAD_REQUEST,
  })
  @ApiOperation({
    summary: 'apply the coupons USER',
    description: 'apply the coupons USER',
  })
  async applyCoupon(@Body() dto: ApplyCouponDto, @Request() req) {
    const userId = req.user.id;
    return this.couponsService.applyCoupon(userId, dto);
  }
}
