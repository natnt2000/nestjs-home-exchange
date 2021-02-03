import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../src/config/typeorm.config';
import { AuthSignInDto } from '../src/auth/dto/auth-signin.dto';
import { AuthModule } from '../src/auth/auth.module';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

describe('ListingsModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...typeOrmConfig, keepConnectionAlive: true }),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Sign up', () => {
    it('Should return email already exist with status 409', () => {
      const signUpData: AuthCredentialsDto = {
        email: 'admin@gmail.com',
        firstName: 'test fn',
        lastName: 'test ln',
        phoneNumber: '9999999',
        password: '12345678',
      };

      return request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(signUpData)
        .expect(409)
        .expect(({ body }) => {
          expect(body.statusCode).toEqual(409);
          expect(body.error).toEqual('Conflict');
        });
    });

    it('Should return sign up successfully with new account', () => {
      const signUpData: AuthCredentialsDto = {
        email: 'testacc@gmail.com',
        firstName: 'test fn',
        lastName: 'test ln',
        phoneNumber: '9999999',
        password: '12345678',
      };

      return request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(signUpData)
        .expect(201);
    });
  });

  describe('Sign in', () => {
    it('Sign in failed with email does not exist', () => {
      const account: AuthSignInDto = {
        email: 'admin1@gmail.com',
        password: '12345678',
      };

      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(account)
        .expect(401);
    });

    it('Sign in successfully', () => {
      const account: AuthSignInDto = {
        email: 'admin@gmail.com',
        password: '12345678',
      };

      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(account)
        .expect(200);
    });
  });
});
