import { IsIn, IsNumberString, IsOptional } from 'class-validator';
import { ListingHomeType } from '../enums/listing-home-type.enum';
import { ListingResidenceType } from '../enums/listing-residence-type.enum';

export class GetListingsFilterDto {
  @IsOptional()
  features: string[];

  @IsOptional()
  rules: string[];

  @IsOptional()
  groups: string[];

  @IsOptional()
  @IsIn([ListingHomeType.DEPARTMENT, ListingHomeType.HOUSE])
  homeType: ListingHomeType;

  @IsOptional()
  @IsIn([ListingResidenceType.PRIMARY, ListingResidenceType.SECONDARY])
  residenceType: ListingResidenceType;

  @IsOptional()
  @IsNumberString()
  guestpoints_from: string;

  @IsOptional()
  @IsNumberString()
  guestpoints_to: string;

  @IsOptional()
  @IsNumberString()
  bedrooms: string;

  @IsOptional()
  @IsNumberString()
  bathrooms: string;
}
