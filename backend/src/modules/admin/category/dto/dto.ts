import { IsString, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'A brief description of the category' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The unique slug for the category' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({
    description: 'The UUID of the parent category, if applicable',
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({ description: 'The URL or path to the category image' })
  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiPropertyOptional({ description: 'Whether the category is active or not' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
