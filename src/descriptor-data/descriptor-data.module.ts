import {Module} from '@nestjs/common';
import {DescriptorDataService} from './descriptor-data.service';
import {DescriptorDataController} from './descriptor-data.controller';
import {DescriptorModule} from "../descriptor/descriptor.module";
import {DescriptorValuesModule} from "../descriptor-values/descriptor-values.module";
import {ConditionTreeBuilderModule} from "../condition-tree-builder/condition-tree-builder.module";

@Module({
    imports: [DescriptorModule, DescriptorValuesModule, ConditionTreeBuilderModule],
    controllers: [DescriptorDataController],
    providers: [DescriptorDataService],
    exports: [DescriptorDataService],
})
export class DescriptorDataModule {
}
