import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingFilterDto } from '../listings/dto/get-listings-filter.dto';
import { Listing } from '../listings/listing.entity';
import { ListingRepository } from '../listings/listing.repository';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: ListingRepository,
  ) {}

  async searchWithFilter(
    destination: string,
    listingFilterDto: ListingFilterDto,
  ) {
    return await this.listingRepository.searchWithFilter(
      destination,
      listingFilterDto,
    );
  }
}
