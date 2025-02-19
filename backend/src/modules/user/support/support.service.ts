import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupportDto } from './dto/dto';

@Injectable()
export class SupportService {
  constructor(private readonly prisma: PrismaService) {}

  async createSupport(createSupportDto: CreateSupportDto, userId: string) {
    return this.prisma.support.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        contact: createSupportDto.contact,
        billingName: createSupportDto.billingName,
        billingDate: createSupportDto.billingDate,
        productSerialNo: createSupportDto.productSerialNo,
        productModelNo: createSupportDto.productModelNo,
        issueType: createSupportDto.issueType,
      },
    });
  }
}
