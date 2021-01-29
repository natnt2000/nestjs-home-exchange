import { Listing } from 'src/listings/listing.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Destination extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @OneToMany(() => Listing, (listing) => listing.destination)
  listings: Listing[];
}
