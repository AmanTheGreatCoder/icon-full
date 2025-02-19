import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { emailRegExp } from 'src/common/types/reg.exp.types';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Enter the email',
    example: 'example12@gmail.com',
    required: true,
  })
  @Matches(emailRegExp, {
    message: 'Email must be a valid Format.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'New password for the account',
    example: 'NewSecurePassword123!',
    required: true,
    minLength: 8,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'OTP code for password reset',
    example: '123456',
    required: true,
  })
  @IsNotEmpty()
  otp: string;
}
