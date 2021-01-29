import { Listing } from 'src/listings/listing.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Availability extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;

  @Column()
  exchangeType: string;

  @ManyToOne(() => Listing, (listing) => listing.availabilities)
  listing: Listing[];

  @Column()
  listingId: number;
}
