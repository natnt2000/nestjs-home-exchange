import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureRepository } from './feature.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureRepository])],
})
export class FeaturesModule {}
