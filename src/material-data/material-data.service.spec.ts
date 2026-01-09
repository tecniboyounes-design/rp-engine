import { Test, TestingModule } from '@nestjs/testing';
import { MaterialDataService } from './material-data.service';

describe('MaterialDataService', () => {
  let service: MaterialDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialDataService],
    }).compile();

    service = module.get<MaterialDataService>(MaterialDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
