import {Module} from '@nestjs/common';
import {DescriptorCollectorService} from './descriptor-collector.service';
import {DescriptorCollectorController} from './descriptor-collector.controller';
import {AnglzoneModule} from "../anglzone/anglzone.module";
import {AnglelemModule} from "../anglelem/anglelem.module";
import {ArticleCollectorModule} from "../article-collector/article-collector.module";

@Module({
  controllers: [DescriptorCollectorController],
  providers: [DescriptorCollectorService],
  imports: [AnglzoneModule, AnglelemModule, ArticleCollectorModule],
  exports: [DescriptorCollectorService],
})
export class DescriptorCollectorModule {}
