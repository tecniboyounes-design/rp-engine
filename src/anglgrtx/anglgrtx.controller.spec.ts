import { Test, TestingModule } from '@nestjs/testing';
import { AnglgrtxController } from './anglgrtx.controller';
import { AnglgrtxService } from './anglgrtx.service';

describe('AnglgrtxController', () => {
  let controller: AnglgrtxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnglgrtxController],
      providers: [AnglgrtxService],
    }).compile();

    controller = module.get<AnglgrtxController>(AnglgrtxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
