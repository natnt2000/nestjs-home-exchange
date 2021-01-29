import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { Feature } from './feature.entity';
import { FeatureRepository } from './feature.repository';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: FeatureRepository,
  ) {}

  async getAllFeatures() {
    return await this.featureRepository.getAllFeatures();
  }

  async createFeature(createFeatureDto: CreateFeatureDto) {
    return await this.featureRepository.createFeature(createFeatureDto);
  }
}
