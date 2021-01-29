import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureRepository } from './feature.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureRepository])],
  providers: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
