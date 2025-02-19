import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
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
import { User } from '@prisma/client';
import { Response } from 'express';
import { ApiError } from 'src/common/helper/error_description';
import { JWT_HEADER } from 'src/common/utils/auth';
import { AppConfigService } from 'src/lib/config/config.service';
import { AuthService } from './auth.service';
import { clearTokenCookie, setTokenCookie } from './auth.utils';
import { CurrentUser } from './decorators/get-current-user.decorator';
import { Public } from './decorators/public';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignupDto, UpdateProfileDto } from './dto/signup.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('customer/auth')
@UseGuards(JwtAuthGuard)
@ApiTags('Customer Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: AppConfigService,
  ) {}

  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google Sign-In/Sign-Up' })
  async googleAuth() {}

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.socialLogin(user);
    res.redirect(this.configService.frontendUrl);
  }

  @Get('facebook')
  @Public()
  @UseGuards(FacebookAuthGuard)
  @ApiOperation({ summary: 'Facebook Sign-In/Sign-Up' })
  async facebookAuth() {}

  @Get('facebook/callback')
  @Public()
  @UseGuards(FacebookAuthGuard)
  async facebookAuthCallback(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.socialLogin(user);
    res.redirect(this.configService.frontendUrl);
  }

  @Post('forgot-password')
  @Public()
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto);
  }

  @Post('verify-otp')
  @Public()
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return await this.authService.verifyOtp(dto);
  }

  @Post('reset-password')
  @Public()
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(dto);
  }

  @Patch('profile')
  async updateProfile(
    @CurrentUser() user: User,
    @Body() dto: UpdateProfileDto,
  ) {
    return await this.authService.updateProfile(user, dto);
  }

  @Patch('address')
  async updateAddress(
    @CurrentUser() user: User,
    @Body() dto: UpdateAddressDto,
  ) {
    return await this.authService.updateAddress(user, dto);
  }

  @Post('register')
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
  @ApiOperation({
    summary: 'user Signup',
    description: 'user Signup',
  })
  async signup(
    @Body() dto: SignupDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const response = await this.authService.signup(dto);
    setTokenCookie(res, response.tokens, this.configService);
    return response;
  }

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

  @Post('refresh-token')
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
    summary: 'Refresh token',
    description: 'Generate new access token using refresh token.',
  })
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return await this.authService.refreshToken(dto.refreshToken);
  }

  @Post('logout')
  @ApiBearerAuth(JWT_HEADER)
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

  @Get('session')
  @ApiBearerAuth(JWT_HEADER)
  @ApiOperation({ summary: 'Get session' })
  async session(@CurrentUser() user: User) {
    return {
      user,
      message: 'Session retrieved',
    };
  }
}
