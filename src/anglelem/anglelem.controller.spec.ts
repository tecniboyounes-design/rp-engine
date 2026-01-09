import { Test, TestingModule } from '@nestjs/testing';
import { AnglelemController } from './anglelem.controller';
import { AnglelemService } from './anglelem.service';

describe('AnglelemController', () => {
  let controller: AnglelemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnglelemController],
      providers: [AnglelemService],
    }).compile();

    controller = module.get<AnglelemController>(AnglelemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
