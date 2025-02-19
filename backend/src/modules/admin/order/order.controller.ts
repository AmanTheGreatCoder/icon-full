import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { JWT_HEADER_ADMIN } from 'src/common/utils/auth';
import { CurrentUser } from 'src/modules/user/auth/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/modules/user/auth/guards/jwt-auth.guard';
import { OrderQueryDto, UpdateOrderStatusDto } from './dto/dto';
import { OrderService } from './order.service';

@Controller('admin/order')
@ApiTags('Admin Orders')
@ApiBearerAuth(JWT_HEADER_ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(@Query() query: OrderQueryDto) {
    return this.orderService.getAllOrders(query);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  async createOrder(@CurrentUser() user: User) {
    return this.orderService.createOrder(user.id);
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(id, updateOrderStatusDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Get('stats/summary')
  async getOrderStats() {
    return this.orderService.getOrderStats();
  }
}
