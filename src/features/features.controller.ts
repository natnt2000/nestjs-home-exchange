import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private featuresService: FeaturesService) {}

  @Get()
  async getAllFeatures() {
    return await this.featuresService.getAllFeatures();
  }

  @Post()
  async createFeature(
    @Body(ValidationPipe) createFeatureDto: CreateFeatureDto,
  ) {
    return await this.featuresService.createFeature(createFeatureDto);
  }
}
