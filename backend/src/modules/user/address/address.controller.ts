import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, Role } from '@prisma/client';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { JWT_HEADER } from 'src/common/utils/auth';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CurrentUser } from '../auth/decorators/get-current-user.decorator';
import { CreateAddressDto } from './dto/dto';

@Controller('user/address')
@ApiTags('User Address')
@ApiBearerAuth(JWT_HEADER)
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getUserAddresses(@CurrentUser() user: User) {
    return this.addressService.getUserAddresses(user.id);
  }

  @Post()
  async createUserAddress(
    @CurrentUser() user: User,
    @Body() body: CreateAddressDto,
  ) {
    return this.addressService.createUserAddress(user.id, body);
  }

  // @Delete(':id')
  // async deleteUserAddress() {
  //   return this.addressService.deleteUserAddress();
  // }
}
