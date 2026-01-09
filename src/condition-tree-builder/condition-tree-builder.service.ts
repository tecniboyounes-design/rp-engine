import { Injectable } from '@nestjs/common';
import { ConditionsComparisonsService } from '../conditions-comparisons/conditions-comparisons.service';
import { ConditionsOperationsService } from '../conditions-operations/conditions-operations.service';
import { ConditionsService } from '../conditions/conditions.service';
import { type ConditionInfo } from './dto/condition-info.type';
import { type ComparisonRow } from './dto/comparison-row.type';
import { type OperationRow } from './dto/operation-row.type';
import { constants, type OperationType } from './utils/constants';
import type { ConditionTreeResponse } from './dto/condition-tree.response';
import type { TreeNode } from './dto/tree-node.dto';

export type { ConditionTreeResponse } from './dto/condition-tree.response';

type Term = { kind: 'comparison'; data: ComparisonRow } | { kind: 'operation'; data: OperationRow };

@Injectable()
export class ConditionTreeBuilderService {
  constructor(
    private readonly conditionComparisonsService: ConditionsComparisonsService,
    private readonly conditionOperationsService: ConditionsOperationsService,
    private readonly conditionsService: ConditionsService,
  ) {}

  // Build the condition tree from the database
  async buildTree(conditionId: number): Promise<ConditionTreeResponse> {
    // Fetch the root condition
    const condition = (await this.conditionsService.findOne(+conditionId)) as ConditionInfo | null;

    if (!condition) throw new Error(`Condition with ID ${conditionId} not found`);

    // Fetch all terms for the condition
    const [comparisons, operations] = await Promise.all([
      this.conditionComparisonsService.findByCondition(+conditionId) as Promise<ComparisonRow[]>,
      this.conditionOperationsService.findByCondition(+conditionId) as Promise<OperationRow[]>,
    ]);

    const terms: Term[] = [...comparisons.map((c) => ({ ...c, kind: 'comparison' as const, data: c })), ...operations.map((o) => ({ ...o, kind: 'operation' as const, data: o }))];

    // ⬇️ same structure: find + filter + map, just typed
    const buildNode = (termNum: number): TreeNode | null => {
      const node = terms.find((term) => term.data.TERMNUM === termNum);
      if (!node) return null;

      const children = terms
        .filter((term) => term.data.PARENTTERMNUM === termNum)
        .map((child) => buildNode(child.data.TERMNUM))
        .filter((n): n is TreeNode => n !== null); // type-narrow from (TreeNode|null)[]

      if (node.kind === 'comparison') {
        return { kind: 'comparison', data: node.data, children };
      } else {
        // decorate with a readable op string
        const OPSTRING: OperationType = constants[node.data.OPERATIONTYPE] ?? 'AND';
        return { kind: 'operation', data: { ...node.data, OPSTRING }, children };
      }
    };

    const root = buildNode(condition.ROOTTERMNUM);
    const roots = root ? [root] : [];

    // Build the tree starting from the root term
    return { condition, roots };
  }
}
