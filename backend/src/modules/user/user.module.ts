import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { SupportModule } from './support/support.module';
import { BrandModule } from './brand/brand.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    OrderModule,
    BrandModule,
    SupportModule,
    ProductModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
