import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

enum SortBy {
  DAYS30 = 30,
  DAYS45 = 45,
  DAYS60 = 60,
  DAYS75 = 75,
}

export class QueryAddedDoctorsDto {
  @ApiPropertyOptional({
    enum: SortBy,
    description: 'Sort doctors by days since they were added',
    example: 30,
    enumName: 'SortBy',
  })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;
}
