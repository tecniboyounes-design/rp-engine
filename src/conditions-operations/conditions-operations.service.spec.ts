import { Test, TestingModule } from '@nestjs/testing';
import { ConditionsOperationsService } from './conditions-operations.service';

describe('ConditionsOperationsService', () => {
  let service: ConditionsOperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConditionsOperationsService],
    }).compile();

    service = module.get<ConditionsOperationsService>(ConditionsOperationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
