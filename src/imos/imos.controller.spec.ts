import { Test, TestingModule } from '@nestjs/testing';
import { ImosController } from './imos.controller';
import { ImosService } from './imos.service';

describe('ImosController', () => {
  let controller: ImosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImosController],
      providers: [ImosService],
    }).compile();

    controller = module.get<ImosController>(ImosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
