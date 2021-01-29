import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.entity';

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
  async getAllListings(filterDto: GetListingsFilterDto) {
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
}
