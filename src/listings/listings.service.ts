import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { Listing } from './listing.entity';
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: ListingRepository,
    private readonly configService: ConfigService,
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
