import { Test, TestingModule } from '@nestjs/testing';
import { AnglgrtxService } from './anglgrtx.service';

describe('AnglgrtxService', () => {
  let service: AnglgrtxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnglgrtxService],
    }).compile();

    service = module.get<AnglgrtxService>(AnglgrtxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
