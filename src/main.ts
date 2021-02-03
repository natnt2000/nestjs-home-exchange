import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  const configSwagger = new DocumentBuilder()
    .setTitle('Home Exchange')
    .setDescription('VMO NestJS Project: Home Exchange')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwagger);
  await app.listen(port || 3000);
}
bootstrap();
