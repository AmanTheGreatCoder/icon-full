import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportDto {
  @ApiProperty({
    description: 'The type of issue',
    example: 'Software',
  })
  @IsNotEmpty()
  @IsString()
  issueType: string;

  @ApiProperty({
    description: 'The message of the issue',
    example: 'The software is not working',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The contact of the user',
    example: '0123456789',
  })
  @IsNotEmpty()
  @IsString()
  contact: string;

  @ApiProperty({
    description: 'The billing name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  billingName: string;

  @ApiProperty({
    description: 'The billing date of the user',
    example: '2021-01-01',
  })
  @IsNotEmpty()
  @IsDate()
  billingDate: Date;

  @ApiProperty({
    description: 'The product serial number of the user',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  productSerialNo: string;

  @ApiProperty({
    description: 'The product model number of the user',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  productModelNo: string;
}
