import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './language.entity';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languagesRepository: LanguageRepository,
  ) {}

  async getAllLanguages() {
    return await this.languagesRepository.getAllLanguages();
  }

  async createLanguage(createLanguageDto: CreateLanguageDto) {
    return await this.languagesRepository.createLanguage(createLanguageDto);
  }
}
