export interface IListing {
  id: number;
  title: string;
  description: string;
  guestPoints?: number;
  homeType: string;
  residenceType: string;
  latitude: string;
  longitude: string;
  images?: any;
  surfaceArea: number;
  bedrooms: number;
  bathrooms: number;
  destinationId: number;
  ownerId: number;
}
