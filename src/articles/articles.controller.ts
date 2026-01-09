import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':NAME')
  findOne(@Param('NAME') NAME: string) {
    return this.articlesService.findOne(NAME, '');
  }
}
