import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BrandModule } from './brand/brand.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CouponsModule } from './coupons/coupons.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { SupportModule } from './support/support.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    SupportModule,
    UserModule,
    UploadModule,
    BrandModule,
    ProductModule,
    OrderModule,
    CouponsModule,
    CategoryModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
