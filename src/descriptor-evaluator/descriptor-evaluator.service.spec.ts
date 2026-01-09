import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorEvaluatorService } from './descriptor-evaluator.service';

describe('DescriptorEvaluatorService', () => {
  let service: DescriptorEvaluatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescriptorEvaluatorService],
    }).compile();

    service = module.get<DescriptorEvaluatorService>(DescriptorEvaluatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
