import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWT_HEADER } from 'src/common/utils/auth';
import { Paginate } from 'src/lib/pagination/paginate';
import { PaginationQueryDto } from 'src/lib/pagination/pagination.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(JWT_HEADER)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: PaginationQueryDto) {
    const paginate = new Paginate(query);
    const { data, total } = await this.userService.getAllUsers(
      paginate.params(),
    );
    return paginate.response(data, total);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
