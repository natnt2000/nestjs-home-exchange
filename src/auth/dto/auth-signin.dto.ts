import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignInDto {
  @IsNotEmpty()
  @IsEmail({ ignore_max_length: true })
  email: string;

  @IsNotEmpty()
  password: string;
}
