import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorValuesController } from './descriptor-values.controller';
import { DescriptorValuesService } from './descriptor-values.service';

describe('DescriptorValuesController', () => {
  let controller: DescriptorValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptorValuesController],
      providers: [DescriptorValuesService],
    }).compile();

    controller = module.get<DescriptorValuesController>(DescriptorValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
