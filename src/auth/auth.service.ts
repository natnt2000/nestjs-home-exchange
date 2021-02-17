import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthErrorCode } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    try {
      const user = this.userRepository.create(authCredentialsDto);
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(authSignInDto: AuthSignInDto) {
    const { email, password } = authSignInDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(AuthErrorCode.EMAIL_DOES_NOT_EXIST);
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      throw new UnauthorizedException(AuthErrorCode.PASSWORD_IS_INCORRECT);
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(AuthErrorCode.EMAIL_DOES_NOT_EXIST);
    }

    return user;
  }
}
