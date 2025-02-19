import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async createUserAddress(userId: string, dto: CreateAddressDto) {
    return this.prisma.address.create({
      data: {
        address: dto.address,
        city: dto.city,
        country: dto.country,
        fullName: dto.name,
        postalCode: dto.postalCode,
        state: dto.state,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
