import { Test, TestingModule } from '@nestjs/testing';
import { ArticleCollectorService } from './article-collector.service';

describe('ArticleCollectorService', () => {
  let service: ArticleCollectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleCollectorService],
    }).compile();

    service = module.get<ArticleCollectorService>(ArticleCollectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
