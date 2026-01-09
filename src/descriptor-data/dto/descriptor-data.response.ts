import type { ConditionTreeResponse } from '../../condition-tree-builder/dto/condition-tree.response';

export interface DescriptorNodeData {
  nodeNum: number;
  lindiv: string;
  comment: string;
  conditionId: number;
  conditionTree: ConditionTreeResponse | null;
}

export interface DescriptorDataResponse {
  descriptor: {
    name: string;
    comment: string;
    sampdim: string;
    inorder: string;
    descType: number;
  } | null;
  nodes: DescriptorNodeData[];
}
