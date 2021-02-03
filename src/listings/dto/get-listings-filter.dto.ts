import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListingFilterDto {
  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Features',
    name: 'features[]',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  features: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Rules',
    name: 'rules[]',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  rules: string[];

  @IsOptional()
  @IsNotEmpty()
  groups: string[];

  @ApiProperty({
    type: String,
    description: 'Home type',
    required: false,
    enum: ['House', 'Department'],
  })
  @IsOptional()
  @IsNotEmpty()
  homeType: string;

  @ApiProperty({
    type: String,
    description: 'Residence Type',
    required: false,
    enum: ['Primary', 'Secondary'],
  })
  @IsOptional()
  @IsNotEmpty()
  residenceType: string;

  @ApiProperty({
    type: String,
    description: 'Guest point from',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  guestpoints_from: string;

  @ApiProperty({
    type: String,
    description: 'Guest point to',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  guestpoints_to: string;

  @ApiProperty({
    type: String,
    description: 'Bedrooms',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  bedrooms: string;

  @ApiProperty({
    type: String,
    description: 'Bathrooms',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  bathrooms: string;
}
