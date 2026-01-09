import { Test, TestingModule } from '@nestjs/testing';
import { SurfaceDataService } from './surface-data.service';

describe('SurfaceDataService', () => {
  let service: SurfaceDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurfaceDataService],
    }).compile();

    service = module.get<SurfaceDataService>(SurfaceDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
