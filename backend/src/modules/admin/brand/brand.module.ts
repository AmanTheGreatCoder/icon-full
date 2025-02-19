import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
