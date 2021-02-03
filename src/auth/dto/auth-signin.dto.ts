import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignInDto {
  @ApiProperty({ type: String, description: 'Email' })
  @IsNotEmpty()
  @IsEmail({ ignore_max_length: true })
  email: string;

  @ApiProperty({ type: String, description: 'Password' })
  @IsNotEmpty()
  password: string;
}
