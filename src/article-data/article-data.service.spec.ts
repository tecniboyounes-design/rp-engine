import { Test, TestingModule } from '@nestjs/testing';
import { ArticleDataService } from './article-data.service';

describe('ArticleDataService', () => {
  let service: ArticleDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleDataService],
    }).compile();

    service = module.get<ArticleDataService>(ArticleDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
