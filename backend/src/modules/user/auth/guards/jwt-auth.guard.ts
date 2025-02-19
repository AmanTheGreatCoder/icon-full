import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom, Observable } from 'rxjs';
import { AppConfigService } from 'src/lib/config/config.service';
import { PUBLIC_KEY } from '../decorators/public';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
    private readonly configService: AppConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    this.logger.debug(token);

    if (!token) {
      throw new UnauthorizedException('Auth token not found');
    }

    const result = super.canActivate(context);
    if (result instanceof Observable) {
      return firstValueFrom(result);
    }
    return result;
  }
}
