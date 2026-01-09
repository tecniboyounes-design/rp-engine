import { Test, TestingModule } from '@nestjs/testing';
import { SurfaceDataController } from './surface-data.controller';
import { SurfaceDataService } from './surface-data.service';

describe('SurfaceDataController', () => {
  let controller: SurfaceDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurfaceDataController],
      providers: [SurfaceDataService],
    }).compile();

    controller = module.get<SurfaceDataController>(SurfaceDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
