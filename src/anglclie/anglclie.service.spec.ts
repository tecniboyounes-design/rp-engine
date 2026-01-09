import { Test, TestingModule } from '@nestjs/testing';
import { AnglclieService } from './anglclie.service';

describe('AnglclieService', () => {
  let service: AnglclieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnglclieService],
    }).compile();

    service = module.get<AnglclieService>(AnglclieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
