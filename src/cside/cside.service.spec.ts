import { Test, TestingModule } from '@nestjs/testing';
import { CsideService } from './cside.service';

describe('CsideService', () => {
  let service: CsideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsideService],
    }).compile();

    service = module.get<CsideService>(CsideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
