import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get()
  async getAllGroups() {
    return await this.groupsService.getAllGroups();
  }

  @Post()
  async createGroup(
    @Body(new ValidationPipe()) createGroupDto: CreateGroupDto,
  ) {
    return await this.groupsService.createGroup(createGroupDto);
  }
}
