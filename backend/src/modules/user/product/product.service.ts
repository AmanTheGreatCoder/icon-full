import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, ProductType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductComparisonData, ProductQueryDto } from './dto/dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts(query: ProductQueryDto) {
    let where: Prisma.ProductWhereInput = {
      type: query.type,
      stock: {
        gt: 0,
      },

      ...(query.type && { type: query.type }),
      ...(query.category && {
        category: {
          name: {
            in: query.category,
          },
        },
      }),
      ...(query.brand && {
        brand: {
          name: {
            in: query.brand,
          },
        },
      }),
    };

    Object.keys(query.search).forEach((key) => {
      const values = query.search[key];
      if (values.length > 0) {
        where = {
          ...where,
          AND: [
            {
              OR: values.map((value) => ({
                specs: {
                  path: [key],
                  string_contains: value,
                },
              })),
            },
          ],
        };
      }
    });

    console.log('queryr', JSON.stringify(where));

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

  async getProductFilters(type: ProductType) {
    const products = await this.prisma.product.findMany({
      where: { type: type?.toUpperCase() as ProductType, isPublished: true },
      include: {
        brand: true,
        category: {
          include: {
            parent: true,
          },
        },
      },
    });

    const specFilters = new Map<string, Set<string>>();

    specFilters.set('brand', new Set<string>());
    specFilters.set('category', new Set<string>());

    products.forEach((product) => {
      if (product.category?.parent?.name) {
        const categorySet = specFilters.get('category');
        categorySet?.add(product.category.name);
      }

      // Handle brand
      if (product.brand?.name) {
        const brandSet = specFilters.get('brand');
        brandSet?.add(product.brand.name);
      }

      // Handle dynamic specs
      if (product.specs) {
        const specs = product.specs as Record<string, any>;

        Object.entries(specs).forEach(([key, value]) => {
          if (value) {
            if (!specFilters.has(key)) {
              specFilters.set(key, new Set<string>());
            }
            const specSet = specFilters.get(key);
            specSet?.add(`${value}`);
          }
        });
      }
    });

    // Convert the map to the required array format
    return Array.from(specFilters.entries())
      .filter(([_, values]) => values.size > 0) // Only include filters that have values
      .map(([key, values]) => ({
        title: key,
        options: Array.from(values),
      }));
  }

  async getFeaturedProducts() {
    return this.prisma.product.findMany({
      where: {
        featured: true,
        isPublished: true,
      },
      include: {
        brand: true,
      },
    });
  }

  async compareProducts(productIds: string[]) {
    if (productIds.length < 2) {
      throw new BadRequestException(
        'At least two products are required for comparison',
      );
    }

    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      include: {
        brand: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more products not found');
    }

    const productType = products[0].type;
    if (!products.every((p) => p.type === productType)) {
      throw new BadRequestException(
        'Can only compare products of the same type',
      );
    }

    const processedProducts: ProductComparisonData[] = products.map(
      (product) => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        type: product.type,
        brand: product.brand,
        specs: product.specs,
        averageRating: this.calculateAverageRating(product.reviews),
        totalReviews: product.reviews.length,
      }),
    );

    return processedProducts;
  }

  private calculateAverageRating(reviews: { rating: number }[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  }
}
