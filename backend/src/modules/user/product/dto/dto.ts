import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class ProductQueryDto {
  @ApiProperty({
    description: 'Search terms for the product query as key-value pairs',
    required: false,
    type: Object,
  })
  @IsOptional()
  search?: { [key: string]: string[] };

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
    type: [String],
  })
  @IsOptional()
  @IsString({ each: true })
  category?: string[];

  @ApiProperty({
    description: 'Brand ID filter',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsString({ each: true })
  brand?: string[];

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

class ProductSpecificationsDto {
  @ApiProperty()
  @IsString()
  processor: string;

  @ApiProperty()
  @IsString()
  memory: string;

  @ApiProperty()
  @IsString()
  storage: string;

  @ApiProperty()
  @IsString()
  display: string;

  @ApiProperty()
  @IsString()
  graphics: string;

  @ApiProperty()
  @IsString()
  operating_system: string;
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

export interface ValidationResult {
  isCompatible: boolean;
  issues: string[];
  warnings: string[];
  recommendations: string[];
}

export interface ComparisonResult {
  products: ProductComparisonData[];
  commonFeatures: string[];
  differences: {
    [key: string]: {
      [productId: string]: any;
    };
  };
}

export interface ProductComparisonData {
  id: string;
  name: string;
  price: number;
  type: ProductType;
  brand: {
    name: string;
  };
  specs: any;
  averageRating: number;
  totalReviews: number;
}
