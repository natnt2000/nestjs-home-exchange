import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
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
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign In' })
  @ApiOkResponse({ type: String })
  async signIn(
    @Body(ValidationPipe) authSignInDto: AuthSignInDto,
    @Res() res: Response,
  ) {
    const accessToken = await this.authService.signIn(authSignInDto);
    res.status(HttpStatus.OK).json(accessToken);
  }
}
