import { EntityRepository, Repository } from 'typeorm';
import { Destination } from './destination.entity';

@EntityRepository(Destination)
export class DestinationRepository extends Repository<Destination> {}
