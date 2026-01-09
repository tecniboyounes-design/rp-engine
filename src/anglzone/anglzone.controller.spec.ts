import { Test, TestingModule } from '@nestjs/testing';
import { AnglzoneController } from './anglzone.controller';
import { AnglzoneService } from './anglzone.service';

describe('AnglzoneController', () => {
  let controller: AnglzoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnglzoneController],
      providers: [AnglzoneService],
    }).compile();

    controller = module.get<AnglzoneController>(AnglzoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
