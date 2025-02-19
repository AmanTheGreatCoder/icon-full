import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { JWT_HEADER_ADMIN } from 'src/common/utils/auth';
import { JwtAuthGuard } from 'src/modules/user/auth/guards/jwt-auth.guard';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/dto';

@Controller('admin/brand')
@ApiTags('Admin Brands')
@ApiBearerAuth(JWT_HEADER_ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getBrands() {
    return this.brandService.getBrands();
  }

  @Get(':id')
  async getBrand(@Param('id') id: string) {
    return this.brandService.getBrandById(id);
  }

  @Post()
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

  @Put(':id')
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.updateBrand(id, updateBrandDto);
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }
}
