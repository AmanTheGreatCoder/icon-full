import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Pagination } from 'src/lib/pagination/paginate';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getAllUsers(params: Pagination) {
    const orderBy: Prisma.UserOrderByWithRelationInput = {
      ...params.orderBy,
    };

    const where: Prisma.UserWhereInput = {
      ...params.where,
    };

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        ...params,
        where,
        orderBy,
      }),
      this.prisma.user.count({
        where: {
          ...params.where,
        },
      }),
    ]);

    return { data, total };
  }
}
