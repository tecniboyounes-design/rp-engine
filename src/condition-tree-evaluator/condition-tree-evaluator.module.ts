// typescript
import { Module } from '@nestjs/common';
import { ConditionTreeEvaluatorService } from './condition-tree-evaluator.service';
import { ConditionTreeEvaluatorController } from './condition-tree-evaluator.controller';
import { ConditionTreeBuilderModule } from '../condition-tree-builder/condition-tree-builder.module';

@Module({
  imports: [ConditionTreeBuilderModule],
  providers: [ConditionTreeEvaluatorService],
  controllers: [ConditionTreeEvaluatorController],
  exports: [ConditionTreeEvaluatorService],
})
export class ConditionTreeEvaluatorModule {}
