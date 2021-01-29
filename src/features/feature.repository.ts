import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { Feature } from './feature.entity';

@EntityRepository(Feature)
export class FeatureRepository extends Repository<Feature> {
  async getAllFeatures() {
    try {
      const features = await this.find();
      return features;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createFeature(createFeatureDto: CreateFeatureDto) {
    try {
      const { name } = createFeatureDto;

      const feature = new Feature();
      feature.name = name;
      await feature.save();

      return feature;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
