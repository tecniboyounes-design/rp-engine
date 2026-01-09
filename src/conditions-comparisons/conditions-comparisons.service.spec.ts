import { Test, TestingModule } from '@nestjs/testing';
import { ConditionsComparisonsService } from './conditions-comparisons.service';

describe('ConditionsComparisonsService', () => {
  let service: ConditionsComparisonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConditionsComparisonsService],
    }).compile();

    service = module.get<ConditionsComparisonsService>(ConditionsComparisonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
