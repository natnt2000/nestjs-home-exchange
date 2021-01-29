import { IsNotEmpty } from 'class-validator';

export class CreateRuleDto {
  @IsNotEmpty()
  name: string;
}
