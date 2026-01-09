import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorDataService } from './descriptor-data.service';

describe('DescriptorDataService', () => {
  let service: DescriptorDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescriptorDataService],
    }).compile();

    service = module.get<DescriptorDataService>(DescriptorDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
