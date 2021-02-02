import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingRepository } from 'src/listings/listing.repository';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListingRepository])],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
