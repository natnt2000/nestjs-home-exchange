import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: GroupRepository,
  ) {}

  async getAllGroups() {
    return await this.groupRepository.getAllGroups();
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    return await this.groupRepository.createGroup(createGroupDto);
  }
}
