import { Test, TestingModule } from '@nestjs/testing';
import { ConditionTreeBuilderController } from './condition-tree-builder.controller';
import { ConditionTreeBuilderService } from './condition-tree-builder.service';

describe('ConditionTreeBuilderController', () => {
  let controller: ConditionTreeBuilderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionTreeBuilderController],
      providers: [ConditionTreeBuilderService],
    }).compile();

    controller = module.get<ConditionTreeBuilderController>(ConditionTreeBuilderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
