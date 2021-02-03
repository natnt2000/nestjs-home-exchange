import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authSignInDto: AuthSignInDto) {
    const { email, password } = authSignInDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(`Email does not exist`);
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      throw new UnauthorizedException(`Password is incorrect`);
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
