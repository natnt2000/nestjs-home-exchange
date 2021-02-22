import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ListingFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.entity';

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
  async searchWithFilter(
    destination: string,
    listingFilterDto: ListingFilterDto,
  ) {
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
      } = listingFilterDto;
      const query = this.createQueryBuilder('listing');

      if (destination && destination !== 'everywhere') {
        query
          .leftJoinAndSelect('listing.destination', 'destination')
          .andWhere(
            "(UPPER(:destination) LIKE UPPER(CONCAT('%', destination.city, '%')) OR UPPER(:destination) LIKE UPPER(CONCAT('%', destination.country, '%')))",
            { destination },
          );
      }

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
            features,
          });
      }

      if (rules) {
        query
          .leftJoinAndSelect('listing.rules', 'rule')
          .andWhere('rule.id IN (:...rules)', {
            rules,
          });
      }

      const listings = await query.getMany();
      return listings;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
