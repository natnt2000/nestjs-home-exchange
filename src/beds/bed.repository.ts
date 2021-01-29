import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Bed } from './bed.entity';
import { CreateBedDto } from './dto/create-bed.dto';

@EntityRepository(Bed)
export class BedRepository extends Repository<Bed> {
  async getAllBeds() {
    try {
      const beds = await this.find();
      return beds;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createBed(createBedDto: CreateBedDto) {
    try {
      const { type } = createBedDto;

      const bed = new Bed();
      bed.type = type;
      await bed.save();

      return bed;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
