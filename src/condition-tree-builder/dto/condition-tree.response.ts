import type { ConditionInfo } from './condition-info.type';
import { TreeNode } from './tree-node.dto';

export type ConditionTreeResponse = {
  condition: ConditionInfo;
  roots: TreeNode[]; // usually a single root under ROOTTERMNUM; kept as array for flexibility
};
