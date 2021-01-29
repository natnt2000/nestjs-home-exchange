import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRuleDto } from './dto/create-rule.dto';
import { Rule } from './rule.entity';
import { RuleRepository } from './rule.repository';

@Injectable()
export class RulesService {
  constructor(@InjectRepository(Rule) private ruleRepository: RuleRepository) {}

  async getAllRules() {
    return await this.ruleRepository.getAllRules();
  }

  async createRule(createRuleDto: CreateRuleDto) {
    return await this.ruleRepository.createRule(createRuleDto);
  }
}
