import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail({ ignore_max_length: true })
  email: string;

  @IsNotEmpty()
  password: string;
}
