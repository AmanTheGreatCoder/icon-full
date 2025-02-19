import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  private readonly logger = new Logger(AppConfigService.name);

  constructor(private readonly configService: ConfigService) {}

  private get<T>(key: string) {
    const value = this.configService.get<T>(key);
    if (value == null) {
      throw new InternalServerErrorException(`app env config error ${key}`);
    }
    return value;
  }

  get isDevelopment(): boolean {
    return this.get('NODE_ENV') === 'development';
  }

  get frontendUrl(): string {
    return this.get<string>('app.frontendUrl');
  }

  get backendUrl(): string {
    return this.get<string>('app.backendUrl');
  }

  get googleClientId(): string {
    return this.get<string>('app.googleClientId');
  }

  get googleClientSecret(): string {
    return this.get<string>('app.googleClientSecret');
  }

  get facebookClientId(): string {
    return this.get<string>('app.facebookClientId');
  }

  get facebookClientSecret(): string {
    return this.get<string>('app.facebookClientSecret');
  }

  get accessTokenCookieName(): string {
    return this.get<string>('app.accessTokenCookieName');
  }

  get refreshTokenCookieName(): string {
    return this.get<string>('app.refreshTokenCookieName');
  }

  get refreshTokenSecretExpire(): string {
    return this.get<string>('app.refreshTokenExpiresIn');
  }

  get jwtSecret(): string {
    return this.get<string>('app.jwtSecret');
  }

  get accessTokenSecretExpire(): string {
    return this.get<string>('app.accessTokenExpiresIn');
  }

  get port(): number {
    return this.get<number>('app.port');
  }

  get razorpayKeyId() {
    return this.get<string>('app.razorpayKeyId');
  }

  get razorpayKeySecret() {
    return this.get<string>('app.razorpayKeySecret');
  }

  get cloudinaryCloudName() {
    return this.get<string>('app.cloudinaryCloudName');
  }

  get cloudinaryApiKey() {
    return this.get<string>('app.cloudinaryApiKey');
  }

  get cloudinaryApiSecret() {
    return this.get<string>('app.cloudinaryApiSecret');
  }
}
