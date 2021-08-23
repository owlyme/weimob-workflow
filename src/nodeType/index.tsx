import React from 'react';
import { NodeProps, NodeConfig } from '../core/types';

import { UndefinedNode } from './baseNode';
import configs from "./node"

const [ Components, Configs ] = configs.reduce((acc, nodeItem) => {
  const {reactNode, ...config} = nodeItem;

  return [
    {
      ...acc[0],
      [config.nodeType]: reactNode
    },
    {
      ...acc[1],
      [config.nodeType]: config
    }
  ]
}, [{}, {}]);


export const NodeTypeComponents = Components;
export const NodeTypeConfigs = Configs;

function getNodeTypeComp(nodeType: any) {
  return NodeTypeComponents[nodeType]
    ? NodeTypeComponents[nodeType]
    : UndefinedNode;
}

interface UseProps {
  nodeType: string;
  node?: React.ReactElement;
  form?: React.ReactElement;
  config: NodeConfig;
}

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

export default function Node(props: NodeProps) {
  const { node } = props;
  const Node = getNodeTypeComp(node.nodeType);
  return (
    <div>
      <Node {...props} />
    </div>
  );
}
