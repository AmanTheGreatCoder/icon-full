import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/dto';
import { ProductType } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async getBrands() {
    return this.prisma.brand.findMany({
      include: {
        products: true,
      },
    });
  }

  async getBrandByProductType(productType: string) {
    const brands = await this.prisma.brand.findMany({
      where: {
        products: {
          some: {
            type: productType as ProductType,
          },
        },
      },
      include: {
        products: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return brands.map((brand) => ({
      ...brand,
      totalProducts: brand._count.products,
      productsByType: brand.products.reduce(
        (acc, product) => {
          acc[product.type] = (acc[product.type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
      _count: undefined,
    }));
  }
}
