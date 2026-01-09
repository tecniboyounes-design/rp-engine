import {Module} from '@nestjs/common';
import {ArticleCollectorService} from './article-collector.service';
import {ArticleCollectorController} from './article-collector.controller';
import {DescriptorValuesModule} from "../descriptor-values/descriptor-values.module";
import {AnglzoneModule} from "../anglzone/anglzone.module";

@Module({
    imports: [DescriptorValuesModule, AnglzoneModule],
    controllers: [ArticleCollectorController],
    providers: [ArticleCollectorService],
    exports: [ArticleCollectorService],
})
export class ArticleCollectorModule {
}
