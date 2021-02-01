import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { genSalt, hash } from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    try {
      const { password } = authCredentialsDto;

      const hashedPass = await this.hashPassword(password);
      const user = this.create({
        ...authCredentialsDto,
        password: hashedPass,
      });
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(password: string) {
    try {
      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);
      return hashedPass;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
