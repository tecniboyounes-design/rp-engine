import { Test, TestingModule } from '@nestjs/testing';
import { ArticleCollectorController } from './article-collector.controller';
import { ArticleCollectorService } from './article-collector.service';

describe('ArticleCollectorController', () => {
  let controller: ArticleCollectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleCollectorController],
      providers: [ArticleCollectorService],
    }).compile();

    controller = module.get<ArticleCollectorController>(ArticleCollectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
