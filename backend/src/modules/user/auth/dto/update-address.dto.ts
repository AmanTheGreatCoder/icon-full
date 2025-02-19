import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Address of the user' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'City of the user' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'State of the user' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Country of the user' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: 'Zip code of the user' })
  @IsNotEmpty()
  @IsString()
  postalCode: string;
}
