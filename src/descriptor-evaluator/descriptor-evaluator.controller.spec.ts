import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorEvaluatorController } from './descriptor-evaluator.controller';
import { DescriptorEvaluatorService } from './descriptor-evaluator.service';

describe('DescriptorEvaluatorController', () => {
  let controller: DescriptorEvaluatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptorEvaluatorController],
      providers: [DescriptorEvaluatorService],
    }).compile();

    controller = module.get<DescriptorEvaluatorController>(DescriptorEvaluatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
