import { Test, TestingModule } from '@nestjs/testing';
import { AnglprimController } from './anglprim.controller';
import { AnglprimService } from './anglprim.service';

describe('AnglprimController', () => {
  let controller: AnglprimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnglprimController],
      providers: [AnglprimService],
    }).compile();

    controller = module.get<AnglprimController>(AnglprimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
