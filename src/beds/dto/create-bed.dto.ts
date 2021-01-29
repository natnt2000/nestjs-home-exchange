import { IsNotEmpty } from 'class-validator';

export class CreateBedDto {
  @IsNotEmpty()
  type: string;
}
