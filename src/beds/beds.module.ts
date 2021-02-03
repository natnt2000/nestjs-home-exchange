import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedRepository } from './bed.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BedRepository])],
})
export class BedsModule {}
