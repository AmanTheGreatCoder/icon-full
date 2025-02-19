import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportDto } from './dto/dto';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('customer/support')
@ApiTags('Customer Support')
@UseGuards(JwtAuthGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  async createSupport(
    @CurrentUser() user: User,
    @Body() createSupportDto: CreateSupportDto,
  ) {
    return this.supportService.createSupport(createSupportDto, user.id);
  }
}
