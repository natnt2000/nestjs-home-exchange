import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../src/config/typeorm.config';
import { ListingsModule } from '../src/listings/listings.module';
import { AuthSignInDto } from '../src/auth/dto/auth-signin.dto';
import { JwtPayload } from '../src/auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateListingDto } from 'src/listings/dto/create-listing.dto';

describe('ListingsModule (e2e)', () => {
  let app: INestApplication;
  const accountSignIn: AuthSignInDto = {
    email: 'admin@gmail.com',
    password: '12345678',
  };

  const generateAccessToken = () => {
    const { email } = accountSignIn;
    const payload: JwtPayload = { email };
    const jwtService = new JwtService({
      secret: 'access_token',
      signOptions: { expiresIn: '1h' },
    });
    return jwtService.sign(payload);
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...typeOrmConfig, keepConnectionAlive: true }),
        ListingsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET listings', () => {
    it('should return unauthorized', () => {
      return request(app.getHttpServer()).get('/listings').expect(401).expect({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    it('should return status 200', () => {
      const accessToken = generateAccessToken();
      return request(app.getHttpServer())
        .get('/listings')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toBeInstanceOf(Array);
        });
    });
  });

  describe('POST listing', () => {
    const dataCreate: CreateListingDto = {
      title: 'Home test',
      description: 'Home test description',
      homeType: 'House',
      residenceType: 'Primary',
      bathrooms: '4',
      bedrooms: '2',
      surfaceArea: '400',
      latitude: '39.743.943',
      longitude: '-105.020.089',
      destinationId: '3',
    };

    it('should create successfully with status 201', () => {
      const accessToken = generateAccessToken();
      return request(app.getHttpServer())
        .post('/listings')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(dataCreate)
        .expect(201);
    });

    it('should create failed without data create', () => {
      const accessToken = generateAccessToken();
      return request(app.getHttpServer())
        .post('/listings')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400);
    });
  });
});
