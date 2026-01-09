import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorCollectorController } from './descriptor-collector.controller';
import { DescriptorCollectorService } from './descriptor-collector.service';

describe('DescriptorCollectorController', () => {
  let controller: DescriptorCollectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptorCollectorController],
      providers: [DescriptorCollectorService],
    }).compile();

    controller = module.get<DescriptorCollectorController>(DescriptorCollectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
