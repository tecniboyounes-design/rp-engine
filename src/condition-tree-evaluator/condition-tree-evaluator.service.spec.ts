import { Test, TestingModule } from '@nestjs/testing';
import { ConditionTreeEvaluatorService } from './condition-tree-evaluator.service';

describe('ConditionTreeEvaluatorService', () => {
  let service: ConditionTreeEvaluatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConditionTreeEvaluatorService],
    }).compile();

    service = module.get<ConditionTreeEvaluatorService>(ConditionTreeEvaluatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
