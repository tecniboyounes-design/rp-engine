import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorDataController } from './descriptor-data.controller';
import { DescriptorDataService } from './descriptor-data.service';

describe('DescriptorDataController', () => {
  let controller: DescriptorDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptorDataController],
      providers: [DescriptorDataService],
    }).compile();

    controller = module.get<DescriptorDataController>(DescriptorDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
