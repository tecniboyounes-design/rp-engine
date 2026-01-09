import { Test, TestingModule } from '@nestjs/testing';
import { ConditionTreeEvaluatorController } from './condition-tree-evaluator.controller';
import { ConditionTreeEvaluatorService } from './condition-tree-evaluator.service';

describe('ConditionTreeEvaluatorController', () => {
  let controller: ConditionTreeEvaluatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionTreeEvaluatorController],
      providers: [ConditionTreeEvaluatorService],
    }).compile();

    controller = module.get<ConditionTreeEvaluatorController>(ConditionTreeEvaluatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
