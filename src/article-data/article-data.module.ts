import {Module} from '@nestjs/common';
import {ArticleDataService} from './article-data.service';
import {ArticleDataController} from './article-data.controller';
import {AnglzoneModule} from '../anglzone/anglzone.module';
import {AnglelemModule} from '../anglelem/anglelem.module';
import {AnglprimModule} from '../anglprim/anglprim.module';
import {AnglclieModule} from '../anglclie/anglclie.module';
import {AnglgrtxModule} from "../anglgrtx/anglgrtx.module";
import {ArticleCollectorModule} from "../article-collector/article-collector.module";
import {DescriptorDataModule} from "../descriptor-data/descriptor-data.module";
import {ImosModule} from "../imos/imos.module";
import {KmsModule} from "../kms/kms.module";
import {CsideModule} from "../cside/cside.module";
import {CabinModule} from "../cabin/cabin.module";
import {MaterialDataModule} from "../material-data/material-data.module";
import {SurfaceDataModule} from "../surface-data/surface-data.module";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  imports: [
      CacheModule.register({
          ttl: 36000000, // 1 hour in milliseconds
          max: 100, // maximum number of items in cache
      }),
      AnglprimModule,
      AnglzoneModule,
      AnglelemModule,
      AnglclieModule,
      AnglgrtxModule,
      ArticleCollectorModule,
      DescriptorDataModule,
      ImosModule,
      KmsModule,
      CsideModule,
      CabinModule,
      MaterialDataModule,
      SurfaceDataModule

  ],
  controllers: [ArticleDataController],
  providers: [ArticleDataService],
  exports: [ArticleDataService],
})
export class ArticleDataModule {}
