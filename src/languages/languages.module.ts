import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageRepository } from './language.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageRepository])],
  providers: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
