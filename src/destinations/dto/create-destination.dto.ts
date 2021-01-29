import { IsNotEmpty } from 'class-validator';

export class CreateDestinationDto {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;
}
