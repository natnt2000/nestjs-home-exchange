import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleRepository } from './rule.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RuleRepository])],
})
export class RulesModule {}
