import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingRepository } from './listing.repository';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListingRepository])],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
