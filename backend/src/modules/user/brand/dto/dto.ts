import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @ApiProperty({
    description: 'Brand name',
    example: 'Brand Name',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Brand description',
    example: 'Brand Description',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Brand logo',
    example: 'https://example.com/logo.png',
  })
  logo?: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Brand website',
    example: 'https://example.com',
  })
  website?: string;
}

export class UpdateBrandDto extends CreateBrandDto {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Brand is active',
    example: true,
  })
  isActive?: boolean;
}
