import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AppConfigService } from 'src/lib/config/config.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto, UpdateProfileDto } from './dto/signup.dto';
import { HashService } from './hash.service';
import { TokensService } from './tokens.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import * as nodemailer from 'nodemailer';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
    private readonly tokensService: TokensService,
  ) {}

  private async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async socialLogin(user: any) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const userExists = await this.prismaService.user.findFirst({
      where: { email: user.email },
    });

    if (!userExists) {
      await this.prismaService.user.create({
        data: {
          firstName: user.firstName,
          email: user.email,
        },
      });
    }

    return { accessToken, refreshToken };
  }

  async updateAddress(user: User, dto: UpdateAddressDto) {
    return await this.prismaService.address.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        fullName: dto.fullName,
        phone: dto.phone,
        address: dto.address,
        country: dto.country,
        state: dto.state,
        city: dto.city,
        postalCode: dto.postalCode,
      },
      update: {
        fullName: dto.fullName,
        phone: dto.phone,
        address: dto.address,
        country: dto.country,
        state: dto.state,
        city: dto.city,
        postalCode: dto.postalCode,
      },
    });
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const otp = await this.prismaService.otp.findFirst({
      where: { email: dto.email, otp: dto.otp },
    });

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    return {
      message: 'OTP verified successfully!',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const otp = await this.prismaService.otp.findFirst({
      where: { email: dto.email, otp: dto.otp },
    });

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await this.hashService.hash(dto.password);

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
  }

  async updateProfile(user: User, dto: UpdateProfileDto) {
    return await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
      },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async signup(dto: SignupDto) {
    const existingUser = await this.findUserByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('Email is already registered.');
    }

    const newUser = await this.createNewUser(dto);

    const tokens = await this.tokensService.generate(newUser);

    return {
      message: 'User registered successfully!',
      user: newUser,
      tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const tokens = await this.tokensService.generate(user);

    return {
      message: 'Login successful!',
      user,
      tokens,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.findUserByEmail(dto.email);

    const otp = await this.prismaService.otp.create({
      data: {
        email: dto.email,
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
      },
    });

    await this.sendOtpEmail(otp.otp, dto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      message: 'OTP email sent successfully!',
    };
  }

  private async sendOtpEmail(otp: string, email: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your OTP Code</h2>
          <p>Please use the following OTP code to verify your account:</p>
          <h1 style="font-size: 32px; background-color: #f5f5f5; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.tokensService.verifyRefreshToken(refreshToken);

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      });

      const newAccessToken =
        await this.tokensService.generateAccessTokenFromRefreshToken(user);

      return {
        message: 'Token refreshed successfully!',
        accessToken: newAccessToken,
      };
    } catch (error: any) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmail(email);

    if (
      !user ||
      !(await this.hashService.comparePassword(password, user.password))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  private async createNewUser(dto: SignupDto): Promise<User> {
    const hashedPassword = await this.hashService.hashPassword(dto.password);
    return await this.prismaService.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
      },
    });
  }
}
