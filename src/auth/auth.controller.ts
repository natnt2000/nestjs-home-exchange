import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'Sign Up' })
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign In' })
  @ApiOkResponse({ type: String })
  async signIn(@Body(ValidationPipe) authSignInDto: AuthSignInDto) {
    return await this.authService.signIn(authSignInDto);
  }
}
