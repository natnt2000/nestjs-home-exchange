import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({ type: String, description: 'First name' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, description: 'Last name' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: String, description: 'Phone number' })
  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'Email' })
  @IsNotEmpty()
  @IsEmail({ ignore_max_length: true })
  email: string;

  @ApiProperty({ type: String, description: 'Password' })
  @IsNotEmpty()
  password: string;
}
