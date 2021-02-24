import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetUserInterface } from 'src/auth/interfaces/get-user.interface';
import { Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { IListing } from './interfaces/listing.interface';
import { Listing } from './listing.entity';
import { ListingRepository } from './listing.repository';
import { ListingsService } from './listings.service';

const mockListing: IListing = {
  id: 1,
  title: 'test',
  bathrooms: 4,
  bedrooms: 2,
  description: 'test desc',
  destinationId: 1,
  homeType: 'House',
  latitude: '123.123.123',
  longitude: '123.123.123',
  residenceType: 'Primary',
  surfaceArea: 400,
  ownerId: 19,
};

const mockUser: GetUserInterface = { id: 19, email: 'admin@gmail.com' };

describe('ListingsService', () => {
  let listingsService: ListingsService;
  let listingRepository: ListingRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: getRepositoryToken(Listing),
          useClass: Repository,
        },
      ],
    }).compile();

    listingsService = moduleRef.get(ListingsService);
    listingRepository = moduleRef.get(getRepositoryToken(Listing));
  });

  describe('getAllListings', () => {
    it('should return an array of listings', async () => {
      jest.spyOn(listingRepository, 'find').mockResolvedValue([]);
      expect(await listingsService.getAllListings(mockUser)).toEqual([]);
    });
  });


  // describe('createListing', () => {
  //   it('should return new listings', async () => {
  //     const createListingDto: CreateListingDto = {
  //       title: 'test',
  //       bathrooms: '4',
  //       bedrooms: '2',
  //       description: 'test desc',
  //       destinationId: '1',
  //       homeType: 'House',
  //       latitude: '123.123.123',
  //       longitude: '123.123.123',
  //       residenceType: 'Primary',
  //       surfaceArea: '400',
  //     };
  //     jest.spyOn(listingRepository, 'create').mockReturnValue(createListingDto);
  //     jest.spyOn(listingRepository, 'save').mockResolvedValue(mockListing);
  //     const result = await listingsService.createListing(
  //       createListingDto,
  //       [],
  //       mockUser,
  //     );
  //     expect(result).toEqual(mockListing);
  //   });
  // });
});
