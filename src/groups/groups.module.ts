import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './group.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository])],
})
export class GroupsModule {}
