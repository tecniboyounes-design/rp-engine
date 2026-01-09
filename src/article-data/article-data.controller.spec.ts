import { Test, TestingModule } from '@nestjs/testing';
import { ArticleDataController } from './article-data.controller';
import { ArticleDataService } from './article-data.service';

describe('ArticleDataController', () => {
  let controller: ArticleDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleDataController],
      providers: [ArticleDataService],
    }).compile();

    controller = module.get<ArticleDataController>(ArticleDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
