import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { AppConfigModule } from 'src/lib/config/config.module';
import { AppConfigService } from 'src/lib/config/config.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { UserModule } from '../user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { HashService } from './hash.service';
import { JwtStrategy } from './jwt.strategy';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    forwardRef(() => UserModule),
    AppConfigModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        global: true,
        signOptions: {
          expiresIn: configService.accessTokenSecretExpire,
        },
        secret: configService.jwtSecret,
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokensService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    HashService,
  ],
})
export class AuthModule {}
