import { compare, genSalt, hash } from 'bcrypt';
import { Group } from '../groups/group.entity';
import { Language } from '../languages/language.entity';
import { Listing } from '../listings/listing.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

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

  @BeforeInsert()
  async hashPassword() {
    try {
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
