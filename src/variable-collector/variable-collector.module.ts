import { Module } from '@nestjs/common';
import { VariableCollectorService } from './variable-collector.service';
import { VariableCollectorController } from './variable-collector.controller';
import { AnglclieModule } from '../anglclie/anglclie.module';
import { AnglzoneModule } from '../anglzone/anglzone.module';
import { AnglprimModule } from '../anglprim/anglprim.module';
import { DescriptorModule } from '../descriptor/descriptor.module';
import { DescriptorValuesModule } from '../descriptor-values/descriptor-values.module';
import { ImosModule } from '../imos/imos.module';

@Module({
  imports: [
    AnglclieModule,
    AnglzoneModule,
    AnglprimModule,
    DescriptorModule,
    DescriptorValuesModule,
    ImosModule,
  ],
  controllers: [VariableCollectorController],
  providers: [VariableCollectorService],
  exports: [VariableCollectorService],
})
export class VariableCollectorModule {}
