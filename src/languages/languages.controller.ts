import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  async getAllLanguages() {
    return await this.languagesService.getAllLanguages();
  }

  @Post()
  async createLanguage(
    @Body(new ValidationPipe()) createLanguageDto: CreateLanguageDto,
  ) {
    return await this.languagesService.createLanguage(createLanguageDto);
  }
}
