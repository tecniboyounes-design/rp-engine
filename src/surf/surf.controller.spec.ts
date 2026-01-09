import { Test, TestingModule } from '@nestjs/testing';
import { SurfController } from './surf.controller';
import { SurfService } from './surf.service';

describe('SurfController', () => {
  let controller: SurfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurfController],
      providers: [SurfService],
    }).compile();

    controller = module.get<SurfController>(SurfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
