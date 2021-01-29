import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from './availability.entity';
import { AvailabilityRepository } from './availability.repository';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: AvailabilityRepository,
  ) {}

  async getAllAvailabilities() {
    try {
      const availabilities = await this.availabilityRepository.find();
      return availabilities;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createAvailability(createAvailabilityDto: CreateAvailabilityDto) {
    try {
      const availability = this.availabilityRepository.create(
        createAvailabilityDto,
      );
      await availability.save();

      return availability;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
