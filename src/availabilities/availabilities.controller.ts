import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Controller('availabilities')
export class AvailabilitiesController {
  constructor(private availabilitiesService: AvailabilitiesService) {}

  @Get()
  async getAllAvailabilities() {
    return await this.availabilitiesService.getAllAvailabilities();
  }

  @Post()
  async createAvailability(
    @Body(ValidationPipe) createAvailabilityDto: CreateAvailabilityDto,
  ) {
    return this.availabilitiesService.createAvailability(createAvailabilityDto);
  }
}
