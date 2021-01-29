import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleRepository } from './rule.repository';
import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';

@Module({
  imports: [TypeOrmModule.forFeature([RuleRepository])],
  controllers: [RulesController],
  providers: [RulesService]
})
export class RulesModule {}
