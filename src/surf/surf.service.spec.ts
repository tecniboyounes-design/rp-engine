import { Test, TestingModule } from '@nestjs/testing';
import { SurfService } from './surf.service';

describe('SurfService', () => {
  let service: SurfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurfService],
    }).compile();

    service = module.get<SurfService>(SurfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
