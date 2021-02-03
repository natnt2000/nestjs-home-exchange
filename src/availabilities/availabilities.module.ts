import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityRepository } from './availability.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AvailabilityRepository])],
})
export class AvailabilitiesModule {}
