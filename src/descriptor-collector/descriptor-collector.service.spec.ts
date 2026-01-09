import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorCollectorService } from './descriptor-collector.service';

describe('DescriptorCollectorService', () => {
  let service: DescriptorCollectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescriptorCollectorService],
    }).compile();

    service = module.get<DescriptorCollectorService>(DescriptorCollectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
