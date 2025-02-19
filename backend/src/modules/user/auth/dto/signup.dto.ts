import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'Enter the firstName of the user',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Enter the lastName of the user',
    example: 'Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'enter the email of the user',
    example: 'testuser@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Enter the Password',
    example: '1234',
  })
  @IsNotEmpty()
  password: string;
}

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Enter the firstName of the user',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'Enter the lastName of the user',
    example: 'Doe',
    required: true,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'Enter the Password',
    example: '1234',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'Enter the Password',
    example: '1234',
  })
  @IsString()
  @IsOptional()
  gender: string;
}
