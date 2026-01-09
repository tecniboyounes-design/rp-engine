import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorController } from './descriptor.controller';
import { DescriptorService } from './descriptor.service';

describe('DescriptorController', () => {
  let controller: DescriptorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptorController],
      providers: [DescriptorService],
    }).compile();

    controller = module.get<DescriptorController>(DescriptorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
