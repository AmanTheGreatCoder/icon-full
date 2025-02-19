import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { ProductQueryDto } from './dto/dto';
import { ProductService } from './product.service';

@Controller('customer/product')
@ApiTags('Customer Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async getAllProducts(@Body() query: ProductQueryDto) {
    return this.productService.getAllProducts(query);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Get('filters/:type')
  async getProductFilters(@Param('type') type: ProductType) {
    const filters = await this.productService.getProductFilters(type);
    return { filters };
  }

  @Get('featured')
  getFeaturedProducts() {
    return this.productService.getFeaturedProducts();
  }

  @Post('compare')
  compareProducts(@Body() productIds: string[]) {
    return this.productService.compareProducts(productIds);
  }
}
