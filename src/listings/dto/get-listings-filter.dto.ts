import { IsIn, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class ListingFilterDto {
  @IsOptional()
  @IsNotEmpty()
  features: string[];

  @IsOptional()
  @IsNotEmpty()
  rules: string[];

  @IsOptional()
  @IsNotEmpty()
  groups: string[];

  @IsOptional()
  @IsNotEmpty()
  homeType: string;

  @IsOptional()
  @IsNotEmpty()
  residenceType: string;

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
