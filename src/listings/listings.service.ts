import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserInterface } from 'src/auth/interfaces/get-user.interface';
import { CreateListingDto } from './dto/create-listing.dto';
import { IListing } from './interfaces/listing.interface';
import { Listing } from './listing.entity';
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: ListingRepository,
  ) {}

  async getAllListings(user: GetUserInterface): Promise<IListing[]> {
    try {
      const ownerId = user.id;
      const listings = await this.listingRepository.find({
        where: { ownerId },
      });
      return listings;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createListing(
    createListingDto: CreateListingDto,
    images: any[],
    user: GetUserInterface,
  ): Promise<IListing> {
    try {
      const {
        surfaceArea,
        bathrooms,
        bedrooms,
        destinationId,
      } = createListingDto;

      const listing = this.listingRepository.create({
        ...createListingDto,
        surfaceArea: parseInt(surfaceArea),
        bathrooms: parseInt(bathrooms),
        bedrooms: parseInt(bedrooms),
        destinationId: parseInt(destinationId),
        ownerId: user.id,
      });

      if (images && images.length > 0) {
        const imagesUrls = images.map((val) => val.filename);
        listing.images = imagesUrls;
      }

      await listing.save();
      return listing;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
