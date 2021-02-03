import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationRepository } from './destination.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationRepository])],
})
export class DestinationsModule {}
