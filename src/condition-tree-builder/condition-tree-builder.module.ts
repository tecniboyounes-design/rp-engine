import { Module } from '@nestjs/common';
import { ConditionTreeBuilderService } from './condition-tree-builder.service';
import { ConditionTreeBuilderController } from './condition-tree-builder.controller';
import { ConditionsComparisonsModule } from '../conditions-comparisons/conditions-comparisons.module';
import { ConditionsOperationsModule } from '../conditions-operations/conditions-operations.module';
import { ConditionsModule } from '../conditions/conditions.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, ConditionsComparisonsModule, ConditionsOperationsModule, ConditionsModule],
  controllers: [ConditionTreeBuilderController],
  providers: [ConditionTreeBuilderService],
  exports: [ConditionTreeBuilderService],
})
export class ConditionTreeBuilderModule {}
