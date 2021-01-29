import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationRepository } from './destination.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationRepository])],
  providers: [DestinationsService],
  controllers: [DestinationsController],
})
export class DestinationsModule {}
