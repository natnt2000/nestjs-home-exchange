import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedRepository } from './bed.repository';
import { BedsController } from './beds.controller';
import { BedsService } from './beds.service';

@Module({
  imports: [TypeOrmModule.forFeature([BedRepository])],
  controllers: [BedsController],
  providers: [BedsService],
})
export class BedsModule {}
