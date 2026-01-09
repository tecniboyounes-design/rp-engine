import { Test, TestingModule } from '@nestjs/testing';
import { CabinController } from './cabin.controller';
import { CabinService } from './cabin.service';

describe('CabinController', () => {
  let controller: CabinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CabinController],
      providers: [CabinService],
    }).compile();

    controller = module.get<CabinController>(CabinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
