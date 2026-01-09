import { Injectable } from '@nestjs/common';
import { ConditionTreeBuilderService, ConditionTreeResponse } from '../condition-tree-builder/condition-tree-builder.service';
import { comparisonMap, keyMapping } from '../condition-tree-builder/utils/constants';
import { TreeNode } from '../condition-tree-builder/dto/tree-node.dto';

const normalizeKey = (key) => keyMapping[key] || key;

@Injectable()
export class ConditionTreeEvaluatorService {
  constructor(readonly treeBuilder: ConditionTreeBuilderService) {}

  treeEvaluator(tree: ConditionTreeResponse, data): boolean {
    if (!tree) return false; // Default behavior when a tree is null
    console.log('nodeEvaluator', JSON.stringify(tree, null, 2));
    tree.roots.map((node) => {
      this.nodeEvaluator(node, data);
    });
    return false;
  }

  nodeEvaluator(node: TreeNode, data): boolean {
    if (node.kind === 'comparison') {
      console.log('comparison node', node.data.RIGHTVALUE);
      // const leftValue = data[normalizeKey(node.data.LEFTVALUE)];
      const leftValue = node.data.LEFTVALUE;
      const rightValue = node.data.RIGHTVALUE;
      // Add a check to ensure values are valid
      if (leftValue === undefined) {
        return false;
      }
      return comparisonMap[node.data.COMPARISONTYPE](leftValue, rightValue);
    }
    if (node.kind === 'operation') {
      console.log('operation', node.data.OPSTRING);
      node.children.map((child) => this.nodeEvaluator(child, data));

      /* prettier-ignore */
      switch (node.data.OPSTRING) {
        case 'AND': return node.children.every(Boolean);
        case 'OR': return node.children.some(Boolean);
        case 'NOT AND': return !node.children.every(Boolean);
        case 'NOT OR': return !node.children.some(Boolean);
        default: return false;
      }
    }
    return false;
  }
}
