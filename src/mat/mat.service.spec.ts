import { Test, TestingModule } from '@nestjs/testing';
import { MatService } from './mat.service';

describe('MatService', () => {
  let service: MatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatService],
    }).compile();

    service = module.get<MatService>(MatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
