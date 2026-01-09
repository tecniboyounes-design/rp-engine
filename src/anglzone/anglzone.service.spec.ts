import { Test, TestingModule } from '@nestjs/testing';
import { AnglzoneService } from './anglzone.service';

describe('AnglzoneService', () => {
  let service: AnglzoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnglzoneService],
    }).compile();

    service = module.get<AnglzoneService>(AnglzoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
