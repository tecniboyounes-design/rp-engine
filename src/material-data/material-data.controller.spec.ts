import { Test, TestingModule } from '@nestjs/testing';
import { MaterialDataController } from './material-data.controller';
import { MaterialDataService } from './material-data.service';

describe('MaterialDataController', () => {
  let controller: MaterialDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialDataController],
      providers: [MaterialDataService],
    }).compile();

    controller = module.get<MaterialDataController>(MaterialDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
