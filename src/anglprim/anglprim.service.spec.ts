import { Test, TestingModule } from '@nestjs/testing';
import { AnglprimService } from './anglprim.service';

describe('AnglprimService', () => {
  let service: AnglprimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnglprimService],
    }).compile();

    service = module.get<AnglprimService>(AnglprimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
