import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageRepository } from './language.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageRepository])],
})
export class LanguagesModule {}
