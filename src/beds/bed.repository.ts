import { EntityRepository, Repository } from 'typeorm';
import { Bed } from './bed.entity';

@EntityRepository(Bed)
export class BedRepository extends Repository<Bed> {}
