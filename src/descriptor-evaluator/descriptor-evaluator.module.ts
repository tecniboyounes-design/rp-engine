import { Module } from '@nestjs/common';
import { DescriptorEvaluatorService } from './descriptor-evaluator.service';
import { DescriptorEvaluatorController } from './descriptor-evaluator.controller';

@Module({
  controllers: [DescriptorEvaluatorController],
  providers: [DescriptorEvaluatorService],
})
export class DescriptorEvaluatorModule {}
