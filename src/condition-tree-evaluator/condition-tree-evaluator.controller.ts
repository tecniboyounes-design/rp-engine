import { Controller, Get, Body, Param } from '@nestjs/common';
import { ConditionTreeEvaluatorService } from './condition-tree-evaluator.service';
import { ConditionTreeResponse } from '../condition-tree-builder/dto/condition-tree.response';

@Controller('condition-tree-evaluator')
export class ConditionTreeEvaluatorController {
  constructor(private readonly conditionTreeEvaluatorService: ConditionTreeEvaluatorService) {}

  @Get(':conditionId/evaluate')
  async evaluate(@Param('conditionId') conditionId: number, @Body() data: any) {
    // Build the condition tree
    const tree: ConditionTreeResponse = await this.conditionTreeEvaluatorService.treeBuilder.buildTree(+conditionId);

    // Evaluate the tree against the provided data
    // data = {}
    const result = this.conditionTreeEvaluatorService.treeEvaluator(tree, data);

    return { result };
  }
}
