import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { GetUserInterface } from 'src/auth/interfaces/get-user.interface';
import { CreateListingDto } from './dto/create-listing.dto';
import { IListing } from './interfaces/listing.interface';
import { ListingRepository } from './listing.repository';
import { ListingsController } from './listings.controller';
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

const mockListingRepository = {
  // find: jest.fn().mockResolvedValue([]),
  // save: jest.fn().mockResolvedValue(mockListing),
};

describe('ListingsController', () => {
  let listingsController: ListingsController;
  let listingsService: ListingsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ListingsController],
      providers: [
        ListingsService,
        { provide: ListingRepository, useValue: mockListingRepository },
      ],
    })
      .overrideGuard(AuthGuard())
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockUser;
          return true;
        },
      })
      .compile();

    listingsController = moduleRef.get<ListingsController>(ListingsController);
    listingsService = moduleRef.get<ListingsService>(ListingsService);
  });

  describe('getAllListings', () => {
    it('should return an array of listings', async () => {
      jest.spyOn(listingsService, 'getAllListings').mockResolvedValue([]);
      const result = await listingsController.getAllListings(mockUser);
      expect(result).toEqual([]);
    });
  });

  describe('createListing', () => {
    it('should return new listings', async () => {
      const createListingDto: CreateListingDto = {
        title: 'test',
        bathrooms: '4',
        bedrooms: '2',
        description: 'test desc',
        destinationId: '1',
        homeType: 'House',
        latitude: '123.123.123',
        longitude: '123.123.123',
        residenceType: 'Primary',
        surfaceArea: '400',
      };

      jest
        .spyOn(listingsService, 'createListing')
        .mockResolvedValue(mockListing);

      const result = await listingsController.createListing(
        createListingDto,
        [],
        mockUser,
      );
      expect(result).toEqual(mockListing);
    });
  });
});
