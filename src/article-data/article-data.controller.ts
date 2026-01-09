import {Body, Controller, Post, UseInterceptors} from '@nestjs/common';
import {ArticleDataService} from './article-data.service';
import {CacheInterceptor} from "@nestjs/cache-manager";

@Controller('article-data')
export class ArticleDataController {
    constructor(private readonly articleDataService: ArticleDataService) {
    }

    // Bulk resolution for multiple values
    @UseInterceptors(CacheInterceptor)
    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return this.articleDataService.findByNames(dto.values)
    }
}
