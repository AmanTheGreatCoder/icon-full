import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User profile description or bio',
    example: 'I am a software developer passionate about web technologies',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;
}
