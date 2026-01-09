import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll() {
    return this.databaseService.articles.findMany();
  }

  findOne(NAME: string, INORDER: string) {
    return this.databaseService.articles.findUnique({ where: { NAME_INORDER: { NAME, INORDER } } });
  }
}
