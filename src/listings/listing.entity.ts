import { User } from '../auth/user.entity';
import { Availability } from '../availabilities/availability.entity';
import { Destination } from '../destinations/destination.entity';
import { Feature } from '../features/feature.entity';
import { Rule } from '../rules/rule.entity';
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

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  guestPoints: number;

  @Column()
  homeType: string;

  @Column()
  residenceType: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ nullable: true, type: 'simple-array' })
  images: string[];

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

  @ManyToOne(() => User, (user) => user.listings)
  owner: User;

  @Column()
  ownerId: number;
}
