import {Controller, Get, Param} from '@nestjs/common';
import {ArticleCollectorService} from './article-collector.service';

@Controller('article-collector')
export class ArticleCollectorController {
  constructor(private readonly articleCollectorService: ArticleCollectorService) {}

  @Get(':articleName')
  findOne(@Param('articleName') articleName: string) {
    return this.articleCollectorService.articlesCollector(articleName);
  }
}
