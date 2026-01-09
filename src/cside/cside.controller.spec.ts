import { Test, TestingModule } from '@nestjs/testing';
import { CsideController } from './cside.controller';
import { CsideService } from './cside.service';

describe('CsideController', () => {
  let controller: CsideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsideController],
      providers: [CsideService],
    }).compile();

    controller = module.get<CsideController>(CsideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
