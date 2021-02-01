import { compare } from 'bcrypt';
import { Group } from 'src/groups/group.entity';
import { Language } from 'src/languages/language.entity';
import { Listing } from 'src/listings/listing.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
@Unique(['phoneNumber'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  phoneNumber: string;

  @Column({ default: false })
  verifiedByEmail: boolean;

  @Column({ default: false })
  verifiedByPhoneNumber: boolean;

  @Column({ default: 100 })
  responseRate: number;

  @Column({ type: 'timestamp', nullable: true })
  lastVisit: Date;

  @Column({ type: 'timestamp', default: 'NOW()' })
  memberSince: Date;

  @Column({ default: 0 })
  guestPoints: number;

  @OneToMany(() => Listing, (listing) => listing.owner)
  listings: Listing[];

  @ManyToMany(() => Language)
  @JoinTable()
  languages: Language[];

  @ManyToMany(() => Group)
  @JoinTable()
  groups: Group[];

  async comparePassword(expectedPassword: string) {
    return await compare(expectedPassword, this.password);
  }
}
