import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/lib/config/config.module';
import { AppConfigService } from 'src/lib/config/config.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { JwtStrategy } from './jwt.strategy';
import { TokensService } from './tokens.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
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
  providers: [AuthService, TokensService, JwtStrategy, HashService],
})
export class AuthModule {}
