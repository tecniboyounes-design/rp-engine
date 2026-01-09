import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorValuesService } from './descriptor-values.service';

describe('DescriptorValuesService', () => {
  let service: DescriptorValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescriptorValuesService],
    }).compile();

    service = module.get<DescriptorValuesService>(DescriptorValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
