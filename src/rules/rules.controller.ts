import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { RulesService } from './rules.service';

@Controller('rules')
export class RulesController {
  constructor(private rulesService: RulesService) {}

  @Get()
  async getAllRules() {
    return await this.rulesService.getAllRules();
  }

  @Post()
  async createRule(@Body(ValidationPipe) createRuleDto: CreateRuleDto) {
    return await this.rulesService.createRule(createRuleDto);
  }
}
