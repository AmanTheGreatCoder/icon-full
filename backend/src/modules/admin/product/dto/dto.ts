import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ProductQueryDto {
  @ApiProperty({
    description: 'Search term for the product query',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by product type',
    required: false,
    enum: ProductType,
  })
  @IsOptional()
  @IsEnum(ProductType)
  type?: ProductType;

  @ApiProperty({
    description: 'Category ID filter',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    description: 'Brand ID filter',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiProperty({
    description: 'Sorting field',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiProperty({
    description: 'Sort order field',
    required: false,
    type: String,
  })
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}

export class ProductSpecificationsDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  processor?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  memory?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  storage?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  display?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  graphics?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  operatingSystem?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includedSoftware?: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  warranty?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  slots?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  additionalFeatures?: string[];
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Stock available for the product',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    description: 'Product type (e.g., ELECTRONICS, FASHION)',
    enum: ProductType,
  })
  @IsEnum(ProductType)
  @IsNotEmpty()
  type: ProductType;

  @ApiProperty({
    description: 'Category ID associated with the product',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: 'Brand ID associated with the product',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({
    description: 'Indicates whether the product is featured',
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiProperty({
    description: 'Indicates whether the product is published',
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ type: ProductSpecificationsDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSpecificationsDto)
  specs?: ProductSpecificationsDto;
}

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({ enum: ProductType })
  @IsOptional()
  @IsEnum(ProductType)
  type?: ProductType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  specs?: object;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ each: true })
  images: string[];
}

export class PCBuildComponentsDto {
  @ApiPropertyOptional({
    description: 'The processor model, e.g., Intel i7-13700K',
  })
  @IsOptional()
  @IsString()
  processor?: string;

  @ApiPropertyOptional({
    description: 'The motherboard model, e.g., ASUS ROG STRIX Z790-E',
  })
  @IsOptional()
  @IsString()
  motherboard?: string;

  @ApiPropertyOptional({
    description: 'The RAM details, e.g., Corsair Vengeance 32GB DDR5',
  })
  @IsOptional()
  @IsString()
  ram?: string;

  @ApiPropertyOptional({
    description: 'List of storage devices, e.g., NVMe or SSD models',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  storage?: string[];

  @ApiPropertyOptional({
    description: 'The GPU model, e.g., NVIDIA GeForce RTX 4090',
  })
  @IsOptional()
  @IsString()
  gpu?: string;

  @ApiPropertyOptional({
    description: 'The PSU model, e.g., Corsair RM850x 850W',
  })
  @IsOptional()
  @IsString()
  psu?: string;

  @ApiPropertyOptional({
    description: 'The PC case model, e.g., NZXT H7 Elite',
  })
  @IsOptional()
  @IsString()
  case?: string;

  @ApiPropertyOptional({
    description: 'List of cooling components, e.g., fans or liquid coolers',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cooling?: string[];
}
