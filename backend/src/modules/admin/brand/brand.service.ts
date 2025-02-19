import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/dto';
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

  async getBrandById(id: string) {
    return this.prisma.brand.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  async createBrand(data: CreateBrandDto) {
    return this.prisma.brand.create({
      data,
    });
  }

  async updateBrand(id: string, data: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: { id },
      data,
    });
  }

  async deleteBrand(id: string) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}
