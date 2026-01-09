import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorService } from './descriptor.service';

describe('DescriptorService', () => {
  let service: DescriptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescriptorService],
    }).compile();

    service = module.get<DescriptorService>(DescriptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
