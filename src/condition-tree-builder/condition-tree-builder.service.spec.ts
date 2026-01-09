import { Test, TestingModule } from '@nestjs/testing';
import { ConditionTreeBuilderService } from './condition-tree-builder.service';

describe('ConditionTreeBuilderService', () => {
  let service: ConditionTreeBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConditionTreeBuilderService],
    }).compile();

    service = module.get<ConditionTreeBuilderService>(ConditionTreeBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
