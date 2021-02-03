import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateListingDto {
  @ApiProperty({ type: String, description: 'Title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, description: 'Description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String, description: 'Home Type' })
  @IsNotEmpty()
  homeType: string;

  @ApiProperty({ type: String, description: 'Residence Type' })
  @IsNotEmpty()
  residenceType: string;

  @ApiProperty({ type: String, description: 'Latitude' })
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({ type: String, description: 'Longitude' })
  @IsNotEmpty()
  longitude: string;

  @ApiProperty({ type: Number, description: 'SurfaceArea' })
  @IsNotEmpty()
  @IsNumberString()
  surfaceArea: number;

  @ApiProperty({ type: Number, description: 'Bedrooms' })
  @IsNotEmpty()
  @IsNumberString()
  bedrooms: number;

  @ApiProperty({ type: Number, description: 'Bathrooms' })
  @IsNotEmpty()
  @IsNumberString()
  bathrooms: number;
}
