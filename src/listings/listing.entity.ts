import { Availability } from 'src/availabilities/availability.entity';
import { Destination } from 'src/destinations/destination.entity';
import { Feature } from 'src/features/feature.entity';
import { Rule } from 'src/rules/rule.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListingHomeType } from './enums/listing-home-type.enum';
import { ListingResidenceType } from './enums/listing-residence-type.enum';

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  guestPoint: number;

  @Column()
  homeType: ListingHomeType;

  @Column()
  residenceType: ListingResidenceType;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  image: string;

  @Column()
  surfaceArea: number;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @ManyToMany(() => Feature)
  @JoinTable()
  features: Feature[];

  @ManyToMany(() => Rule)
  @JoinTable()
  rules: Rule[];

  @ManyToOne(() => Destination, (destination) => destination.listings)
  destination: Destination;

  @Column()
  destinationId: number;

  @OneToMany(() => Availability, (availability) => availability.listing)
  availabilities: Availability[];
}
