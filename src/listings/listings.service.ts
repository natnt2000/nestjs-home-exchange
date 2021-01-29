import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.entity';
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: ListingRepository,
    private readonly configService: ConfigService,
  ) {}

  async getAllListings(filterDto: GetListingsFilterDto) {
    return await this.listingRepository.getAllListings(filterDto);
  }

  async createListing(createListingDto: CreateListingDto, image: any) {
    try {
      const listing = this.listingRepository.create({
        ...createListingDto,
        image: image ? image.filename : null,
      });
      await listing.save();

      return listing;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
