import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.entity';

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
  async filter(filterDto: GetListingsFilterDto) {
    try {
      const {
        guestpoints_from,
        guestpoints_to,
        features,
        groups,
        homeType,
        residenceType,
        rules,
        bedrooms,
        bathrooms,
      } = filterDto;
      const query = this.createQueryBuilder('listing');

      if (homeType) {
        query.andWhere('"homeType" = :homeType', { homeType });
      }

      if (guestpoints_from) {
        query.andWhere('"guestPoint" >= :guestpoints_from', {
          guestpoints_from,
        });
      }

      if (guestpoints_to) {
        query.andWhere('"guestPoint" <= :guestpoints_to', {
          guestpoints_to,
        });
      }

      if (residenceType) {
        query.andWhere('"residenceType" = :residenceType', { residenceType });
      }

      if (bedrooms) {
        query.andWhere('bedrooms = :bedrooms', { bedrooms });
      }

      if (bathrooms) {
        query.andWhere('bathrooms = :bathrooms', { bathrooms });
      }

      if (features) {
        query
          .leftJoinAndSelect('listing.features', 'feature')
          .andWhere('feature.id IN (:...features)', {
            features: Array.isArray(features) ? features : [features],
          });
      }

      if (rules) {
        query
          .leftJoinAndSelect('listing.rules', 'rule')
          .andWhere('rule.id IN (:...rules)', {
            rules: Array.isArray(rules) ? rules : [rules],
          });
      }

      const listings = await query.getMany();
      return listings;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getAllListings(user: User) {
    try {
      const ownerId = user.id;
      const listings = await this.find({
        where: { ownerId },
      });
      return listings;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async createListing(
    createListingDto: CreateListingDto,
    images: any[],
    user: User,
  ) {
    try {
      const listing = this.create(createListingDto);
      listing.ownerId = user.id;

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
