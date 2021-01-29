import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';

@Controller('destinations')
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @Get()
  async getAllDestinations() {
    return await this.destinationsService.getAllDestinations();
  }

  @Post()
  async createDestination(
    @Body(ValidationPipe) createDestinationDto: CreateDestinationDto,
  ) {
    return await this.destinationsService.createDestination(
      createDestinationDto,
    );
  }
}
