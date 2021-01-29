import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { BedsService } from './beds.service';
import { CreateBedDto } from './dto/create-bed.dto';

@Controller('beds')
export class BedsController {
  constructor(private bedsService: BedsService) {}

  @Get()
  async getAllBeds() {
    return await this.bedsService.getAllBeds();
  }

  @Post()
  async createBed(@Body(ValidationPipe) createBedDto: CreateBedDto) {
    return await this.bedsService.createBed(createBedDto);
  }
}
