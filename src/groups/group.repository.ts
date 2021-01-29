import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  async getAllGroups() {
    try {
      const groups = await this.find();
      return groups;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    try {
      const { name } = createGroupDto;
      const group = new Group();
      group.name = name;
      await group.save();
      return group;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
