import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './language.entity';

@EntityRepository(Language)
export class LanguageRepository extends Repository<Language> {
  async getAllLanguages() {
    try {
      const languages = await this.find();
      return languages;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createLanguage(createLanguageDto: CreateLanguageDto) {
    try {
      const { name } = createLanguageDto;
      const language = new Language();
      language.name = name;
      await language.save();
      return language;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
