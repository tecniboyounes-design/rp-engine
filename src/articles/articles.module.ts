import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
