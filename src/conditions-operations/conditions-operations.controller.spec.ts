import { Test, TestingModule } from '@nestjs/testing';
import { ConditionsOperationsController } from './conditions-operations.controller';
import { ConditionsOperationsService } from './conditions-operations.service';

describe('ConditionsOperationsController', () => {
  let controller: ConditionsOperationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionsOperationsController],
      providers: [ConditionsOperationsService],
    }).compile();

    controller = module.get<ConditionsOperationsController>(ConditionsOperationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
