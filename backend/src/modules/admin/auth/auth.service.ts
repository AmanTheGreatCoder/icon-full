import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { HashService } from './hash.service';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly prismaService: PrismaService,
    private readonly tokensService: TokensService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email, role: 'ADMIN' },
    });
    if (
      !user ||
      !(await this.hashService.comparePassword(dto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.tokensService.generate(user);

    return {
      message: 'Login successful!',
      user,
      tokens,
    };
  }
}
