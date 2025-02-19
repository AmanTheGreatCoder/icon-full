import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';

@Controller('customer/order')
@ApiTags('Customer Order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(@CurrentUser() user: User) {
    return this.orderService.getAllOrders(user.id);
  }
}
