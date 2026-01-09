import { Test, TestingModule } from '@nestjs/testing';
import { ImosService } from './imos.service';

describe('ImosService', () => {
  let service: ImosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImosService],
    }).compile();

    service = module.get<ImosService>(ImosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
