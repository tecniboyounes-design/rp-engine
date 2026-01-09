import { Test, TestingModule } from '@nestjs/testing';
import { MatController } from './mat.controller';
import { MatService } from './mat.service';

describe('MatController', () => {
  let controller: MatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatController],
      providers: [MatService],
    }).compile();

    controller = module.get<MatController>(MatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
