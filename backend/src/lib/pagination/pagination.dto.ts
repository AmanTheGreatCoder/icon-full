import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    default: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Search term',
  })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiPropertyOptional({
    description: 'Search fields',
    type: [String],
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string') {
      if (value.includes(',')) {
        return value.split(',').map((item) => item.trim());
      }
      return [value.trim()];
    }

    return value;
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  searchFields?: string[];

  @ApiPropertyOptional({})
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({
    description: '',
    type: [String],
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string') {
      if (value.includes(',')) {
        return value.split(',').map((item) => item.trim());
      }
      return [value.trim()];
    }

    return value;
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  filter?: string[];
}
