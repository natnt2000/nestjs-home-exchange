import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { Listing } from './listing.entity';
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: ListingRepository,
  ) {}

  async getAllListings(user: User) {
    return await this.listingRepository.getAllListings(user);
  }

  async createListing(
    createListingDto: CreateListingDto,
    images: any[],
    user: User,
  ) {
    return await this.listingRepository.createListing(
      createListingDto,
      images,
      user,
    );
  }
}
