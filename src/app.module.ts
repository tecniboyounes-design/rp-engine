import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DescriptorModule } from './descriptor/descriptor.module';
import { DescriptorValuesModule } from './descriptor-values/descriptor-values.module';
import { ConditionsModule } from './conditions/conditions.module';
import { ConditionsComparisonsModule } from './conditions-comparisons/conditions-comparisons.module';
import { ConditionsOperationsModule } from './conditions-operations/conditions-operations.module';
import { ConditionTreeBuilderModule } from './condition-tree-builder/condition-tree-builder.module';
import { ConditionTreeEvaluatorModule } from './condition-tree-evaluator/condition-tree-evaluator.module';
import { DescriptorEvaluatorModule } from './descriptor-evaluator/descriptor-evaluator.module';
import { ArticlesModule } from './articles/articles.module';
import { AnglelemModule } from './anglelem/anglelem.module';
import { AnglzoneModule } from './anglzone/anglzone.module';
import { AnglprimModule } from './anglprim/anglprim.module';
import { AnglclieModule } from './anglclie/anglclie.module';
import { ArticleDataModule } from './article-data/article-data.module';
import { DescriptorDataModule } from './descriptor-data/descriptor-data.module';
import { AnglgrtxModule } from './anglgrtx/anglgrtx.module';
import { ImosModule } from './imos/imos.module';
import { VariablesModule } from './variables/variables.module';
import { VariableCollectorModule } from './variable-collector/variable-collector.module';
import { DescriptorCollectorModule } from './descriptor-collector/descriptor-collector.module';
import { ArticleCollectorModule } from './article-collector/article-collector.module';
import { CsideModule } from './cside/cside.module';
import { KmsModule } from './kms/kms.module';
import { MatModule } from './mat/mat.module';
import { RenderModule } from './render/render.module';
import { SurfModule } from './surf/surf.module';
import { CabinModule } from './cabin/cabin.module';
import { MaterialDataModule } from './material-data/material-data.module';
import { SurfaceDataModule } from './surface-data/surface-data.module';

@Module({
  imports: [
    DatabaseModule,
    DescriptorModule,
    DescriptorValuesModule,
    ConditionsModule,
    ConditionsComparisonsModule,
    ConditionsOperationsModule,
    ConditionTreeBuilderModule,
    ConditionTreeEvaluatorModule,
    DescriptorEvaluatorModule,
    ArticlesModule,
    AnglprimModule,
    AnglelemModule,
    AnglzoneModule,
    AnglclieModule,
    ArticleDataModule,
    DescriptorDataModule,
    AnglgrtxModule,
    ImosModule,
    VariablesModule,
    VariableCollectorModule,
    DescriptorCollectorModule,
    ArticleCollectorModule,
    CsideModule,
    KmsModule,
    MatModule,
    RenderModule,
    SurfModule,
    CabinModule,
    MaterialDataModule,
    SurfaceDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
