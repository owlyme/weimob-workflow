import React from 'react';
import { NodeProps, UseProps } from '../core/types';
import { UndefinedNode } from './baseNode';
import configs from "./node";
import { createComponentsandConfigSet } from "./utils";
export { matchProperty } from "./utils"
export const [ NodeTypeComponents, NodeTypeConfigs ] = createComponentsandConfigSet(configs);

// 注册自定义节点节点, 必须在工程开始前注册
export function registerNode(params: UseProps[]): void {
  (params || []).forEach(({ nodeType, node, config }) => {
    if (!nodeType) {
      console.error('registerNode param need nodeType');
    } else {
      node && (NodeTypeComponents[nodeType] = node);
      config && (NodeTypeConfigs[nodeType] = config);
    }
  })
}

function getNodeTypeComp(nodeType: any) {
  return NodeTypeComponents[nodeType]
    ? NodeTypeComponents[nodeType]
    : UndefinedNode;
}
// 根据节点类型，渲染接点
export default function Node(props: NodeProps) {
  const { node } = props;
  const Node = getNodeTypeComp(node.nodeType);
  return (
    <div>
      <Node {...props} />
    </div>
  );
}
