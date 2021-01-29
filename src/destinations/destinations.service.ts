import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './destination.entity';
import { DestinationRepository } from './destination.repository';
import { CreateDestinationDto } from './dto/create-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: DestinationRepository,
  ) {}

  async getAllDestinations() {
    return await this.destinationRepository.getAllDestinations();
  }

  async createDestination(createDestinationDto: CreateDestinationDto) {
    return await this.destinationRepository.createDestination(
      createDestinationDto,
    );
  }
}
