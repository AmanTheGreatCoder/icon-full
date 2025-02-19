import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto, UpdateUserStatusDto, UserQueryDto } from './dto/dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(query: UserQueryDto) {
    const where = {
      ...(query.search && {
        OR: [
          {
            email: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            firstName: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            lastName: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }),
      ...(query.role && { role: query.role }),
      ...(typeof query.isActive === 'boolean' && { isActive: query.isActive }),
    };

    return this.prisma.user.findMany({
      where,
      include: {
        orders: true,
        address: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
        address: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.getUserById(id);

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        orders: true,
        address: true,
      },
    });
  }

  async updateUserStatus(id: string, data: UpdateUserStatusDto) {
    await this.getUserById(id);

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        orders: true,
        address: true,
      },
    });
  }

  async deleteUser(id: string) {
    await this.getUserById(id);

    await this.prisma.$transaction([
      this.prisma.order.deleteMany({
        where: { userId: id },
      }),
      this.prisma.address.deleteMany({
        where: { userId: id },
      }),
      this.prisma.review.deleteMany({
        where: { userId: id },
      }),
      this.prisma.wishlistItem.deleteMany({
        where: { userId: id },
      }),
      this.prisma.user.delete({
        where: { id },
      }),
    ]);

    return { message: 'User deleted successfully' };
  }

  async getUserStats() {
    const [totalUsers, usersByRole, activeUsers, recentUsers, orderStats] =
      await Promise.all([
        this.prisma.user.count(),

        this.prisma.user.groupBy({
          by: ['role'],
          _count: true,
        }),

        this.prisma.user.count({
          where: { isActive: true },
        }),

        this.prisma.user.findMany({
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            orders: true,
          },
        }),

        this.prisma.order.groupBy({
          by: ['userId'],
          _count: true,
          _sum: {
            totalAmount: true,
          },
        }),
      ]);

    return {
      totalUsers,
      usersByRole,
      activeUsers,
      recentUsers,
      orderStats,
    };
  }

  async findAdminById(id: string) {
    return this.prisma.user.findUnique({
      where: { id, role: Role.ADMIN },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
  }
}
