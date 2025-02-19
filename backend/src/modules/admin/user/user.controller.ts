import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { JWT_HEADER_ADMIN } from 'src/common/utils/auth';
import { JwtAuthGuard } from 'src/modules/user/auth/guards/jwt-auth.guard';
import { UpdateUserDto, UpdateUserStatusDto, UserQueryDto } from './dto/dto';
import { UserService } from './user.service';

@Controller('admin/user')
@ApiTags('Admin Users')
@ApiBearerAuth(JWT_HEADER_ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: UserQueryDto) {
    return this.userService.getAllUsers(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Put(':id/status')
  async updateUserStatus(
    @Param('id') id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    return this.userService.updateUserStatus(id, updateUserStatusDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get('stats/summary')
  async getUserStats() {
    return this.userService.getUserStats();
  }
}
