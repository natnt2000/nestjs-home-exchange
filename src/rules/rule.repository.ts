import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRuleDto } from './dto/create-rule.dto';
import { Rule } from './rule.entity';

@EntityRepository(Rule)
export class RuleRepository extends Repository<Rule> {
  async getAllRules() {
    try {
      const rules = await this.find();
      return rules;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createRule(createRuleDto: CreateRuleDto) {
    try {
      const { name } = createRuleDto;

      const rule = new Rule();
      rule.name = name;
      await rule.save();

      return rule;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
