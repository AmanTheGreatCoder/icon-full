import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWT_HEADER } from 'src/common/utils/auth';
import { JwtAuthGuard } from 'src/modules/user/auth/guards/jwt-auth.guard';
import { BrandService } from './brand.service';
import { ProductType } from '@prisma/client';

@Controller('customer/brand')
@ApiTags('Customer Brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getBrands() {
    return this.brandService.getBrands();
  }

  @Get(':productType')
  async getBrand(@Param('productType') productType: ProductType) {
    return this.brandService.getBrandByProductType(productType);
  }
}
