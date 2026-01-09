import { Test, TestingModule } from '@nestjs/testing';
import { ConditionsComparisonsController } from './conditions-comparisons.controller';
import { ConditionsComparisonsService } from './conditions-comparisons.service';

describe('ConditionsComparisonsController', () => {
  let controller: ConditionsComparisonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionsComparisonsController],
      providers: [ConditionsComparisonsService],
    }).compile();

    controller = module.get<ConditionsComparisonsController>(ConditionsComparisonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
