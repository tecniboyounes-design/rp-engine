import {Injectable} from '@nestjs/common';
import {DescriptorValuesService} from "../descriptor-values/descriptor-values.service";
import {DescriptorService} from "../descriptor/descriptor.service";
import {
    ConditionTreeBuilderService,
    ConditionTreeResponse
} from "../condition-tree-builder/condition-tree-builder.service";

@Injectable()
export class DescriptorDataService {
    constructor(
        private readonly descriptor: DescriptorService,
        private readonly descriptorValuesService: DescriptorValuesService,
        private readonly conditionTreeBuilder: ConditionTreeBuilderService
    ) {
    }

    findAll() {
        return 'Not implemented';
    }

    async findOne(NAME: string) {
        const selectedDescriptor = await this.descriptor.findOne(NAME);
        if (!selectedDescriptor) return null;
        const descriptorValues = await this.descriptorValuesService.findByDescriptorName(NAME);
        const conditionBuilders = await Promise.all(
            descriptorValues.map(async descriptorValue => {
                    let conditionTree: ConditionTreeResponse | null = null;
                    if (descriptorValue.CONDITIONID !== 0) {
                        conditionTree = await this.conditionTreeBuilder.buildTree(descriptorValue.CONDITIONID);
                    }
                    return {
                        nodeNum: descriptorValue.NODENUM,
                        lindiv: descriptorValue.LINDIV,
                        comment: descriptorValue.COMMENT,
                        conditionId: descriptorValue.CONDITIONID,
                        conditionTree,
                    };
                }
            )
        );

        return {
            descriptor: selectedDescriptor,
            nodes: conditionBuilders,
        };
    }

    async findByNames(names: string[]) {
        const uniqueNames = [...new Set(names)];

        const results = await Promise.all(
            uniqueNames.map(name => this.findOne(name))
        );

        return results.filter(result => result !== null);
    }
}
