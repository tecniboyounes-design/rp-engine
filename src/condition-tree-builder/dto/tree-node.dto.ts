import type { OperationType } from '../utils/constants';
import type { ComparisonRow } from './comparison-row.type';
import type { OperationRow } from './operation-row.type';

// We keep original Prisma row shapes inside `data`.
// That gives you full access later without manual mapping.
export type ComparisonNode = {
  kind: 'comparison';
  data: ComparisonRow;
  children: TreeNode[];
};

export type OperationNode = {
  kind: 'operation';
  data: OperationRow & { OPSTRING: OperationType }; // decorate with string op
  children: TreeNode[];
};

export type TreeNode = ComparisonNode | OperationNode;
