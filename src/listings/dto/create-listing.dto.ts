import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ListingHomeType } from '../enums/listing-home-type.enum';
import { ListingResidenceType } from '../enums/listing-residence-type.enum';

export class CreateListingDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  guestPoint: number;

  @IsNotEmpty()
  homeType: ListingHomeType;

  @IsNotEmpty()
  residenceType: ListingResidenceType;

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
