import { IsNotEmpty } from 'class-validator';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  start: string;

  @IsNotEmpty()
  end: string;

  @IsNotEmpty()
  exchangeType: string;

  @IsNotEmpty()
  listingId: number;
}
