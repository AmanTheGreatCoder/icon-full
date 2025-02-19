import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ApiError } from 'src/common/helper/error_description';
import { JWT_HEADER_ADMIN } from 'src/common/utils/auth';
import { AppConfigService } from 'src/lib/config/config.service';
import { AuthService } from './auth.service';
import { clearTokenCookie, setTokenCookie } from './auth.utils';
import { Public } from './decorators/public';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('admin/auth')
@UseGuards(JwtAuthGuard)
@ApiTags('Admin Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: AppConfigService,
  ) {}

  @Post('login')
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiError.SUCCESS_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiError.UNAUTHORIZED_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ApiError.BAD_REQUEST,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary: 'user Login',
    description: 'user Login',
  })
  async login(
    @Body() dto: LoginDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const response = await this.authService.login(dto);
    setTokenCookie(res, response.tokens, this.configService);
    return response;
  }

  @Post('logout')
  @ApiBearerAuth(JWT_HEADER_ADMIN)
  @ApiOperation({ summary: 'Logout store' })
  async logout(
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    clearTokenCookie(res, this.configService);
    return {
      message: 'Logout successful',
    };
  }
}
