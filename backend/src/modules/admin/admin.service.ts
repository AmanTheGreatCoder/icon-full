import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalProducts, totalOrders, totalUsers, recentOrders, productStats] =
      await Promise.all([
        this.prisma.product.count(),
        this.prisma.order.count(),
        this.prisma.user.count(),
        this.prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        }),
        this.prisma.product.groupBy({
          by: ['type'],
          _count: true,
        }),
      ]);

    return {
      totalProducts,
      totalOrders,
      totalUsers,
      recentOrders,
      productStats,
    };
  }
}
