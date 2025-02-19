import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts(query: ProductQueryDto) {
    const where: Prisma.ProductWhereInput = {
      stock: {
        gt: 0,
      },
      ...(query.search && {
        OR: [
          {
            name: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            description: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }),
      ...(query.type && { type: query.type }),
      ...(query.categoryId && { categoryId: query.categoryId }),
      ...(query.brandId && { brandId: query.brandId }),
    };

    return this.prisma.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
      orderBy: query.sortBy
        ? { [query.sortBy]: query.sortOrder || 'desc' }
        : undefined,
    });
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async createProduct(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        type: dto.type,
        categoryId: dto.categoryId,
        brandId: dto.brandId,
        featured: dto.featured,
        isPublished: dto.isPublished,
        images: dto.images,
        specs: dto.specs as unknown as Prisma.InputJsonValue,
      },
      include: {
        category: true,
        brand: true,
      },
    });
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        brandId: data.brandId,
        categoryId: data.categoryId,
        name: data.name,
        price: data.price,
        description: data.description,
        images: data.images,
        stock: data.stock,
        type: data.type,
        specs: data.specs as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
