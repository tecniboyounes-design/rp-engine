import { Test, TestingModule } from '@nestjs/testing';
import { AnglelemService } from './anglelem.service';

describe('AnglelemService', () => {
  let service: AnglelemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnglelemService],
    }).compile();

    service = module.get<AnglelemService>(AnglelemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
