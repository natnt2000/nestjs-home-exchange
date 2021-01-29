import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bed } from './bed.entity';
import { BedRepository } from './bed.repository';
import { CreateBedDto } from './dto/create-bed.dto';

@Injectable()
export class BedsService {
  constructor(@InjectRepository(Bed) private bedRepository: BedRepository) {}

  async getAllBeds() {
    return await this.bedRepository.getAllBeds();
  }

  async createBed(createBedDto: CreateBedDto) {
    return await this.bedRepository.createBed(createBedDto);
  }
}
