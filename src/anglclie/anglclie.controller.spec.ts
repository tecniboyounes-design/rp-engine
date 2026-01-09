import { Test, TestingModule } from '@nestjs/testing';
import { AnglclieController } from './anglclie.controller';
import { AnglclieService } from './anglclie.service';

describe('AnglclieController', () => {
  let controller: AnglclieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnglclieController],
      providers: [AnglclieService],
    }).compile();

    controller = module.get<AnglclieController>(AnglclieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
