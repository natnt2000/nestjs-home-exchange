import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateListingDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  homeType: string;

  @IsNotEmpty()
  residenceType: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  @IsNumberString()
  surfaceArea: number;

  @IsNotEmpty()
  @IsNumberString()
  bedrooms: number;

  @IsNotEmpty()
  @IsNumberString()
  bathrooms: number;
}
