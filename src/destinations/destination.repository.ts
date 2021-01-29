import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Destination } from './destination.entity';
import { CreateDestinationDto } from './dto/create-destination.dto';

@EntityRepository(Destination)
export class DestinationRepository extends Repository<Destination> {
  async getAllDestinations() {
    try {
      const destinations = await this.find();
      return destinations;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createDestination(createDestinationDto: CreateDestinationDto) {
    try {
      const destination = this.create(createDestinationDto);
      await destination.save();

      return destination;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
