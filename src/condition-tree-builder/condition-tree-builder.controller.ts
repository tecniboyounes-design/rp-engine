import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ConditionTreeBuilderService, ConditionTreeResponse } from './condition-tree-builder.service';

@Controller('condition-tree-builder')
export class ConditionTreeBuilderController {
  constructor(private readonly conditionTreeBuilderService: ConditionTreeBuilderService) {}

  @Get(':conditionId')
  async buildConditionTree(@Param('conditionId', ParseIntPipe) id: number): Promise<ConditionTreeResponse> {
    return this.conditionTreeBuilderService.buildTree(id);
  }
}
