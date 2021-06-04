import React from 'react';
import ChildNode from './ChildNode';
import Form from './Form';
import { NodeProps, NodeConfig } from '../../core/types';
import {
  NODE_TYPE_PARALLEL,
  NODE_TYPE_PARALLEL_CHILD,
  CONFIG_KEY,
} from '../../constant';
import { NodeActions, CollapseContainer } from '../../core';

export default function ParallelNode({
  node,
  nodeLevelIndex,
  children,
  parentNode,
  disabled,
  IconCom,
}: NodeProps) {
  const initData = node[CONFIG_KEY];
  const { desc } = initData;
  return (
    <CollapseContainer
      header={
        <div className="node-container-header">
          <IconCom type={node.icon} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="node-name">{node.label}</span>
            <span className="node-desc">{desc}</span>
          </div>
          {!disabled && (
            <NodeActions node={node} nodeLevelIndex={nodeLevelIndex} />
          )}
        </div>
      }
    >
      <div>{children}</div>
    </CollapseContainer>
  );
}

ParallelNode.ChildNode = ChildNode;
ParallelNode.Form = Form;
ParallelNode.config = {
  icon: 'parallelIcon',
  label: 'Parallel',
  nodeType: NODE_TYPE_PARALLEL,
  childrenAbleTypes: [NODE_TYPE_PARALLEL_CHILD],
  draggable: true,
  configCompleteStatus: true,
  [CONFIG_KEY]: {
    cfg: {
      parallel: [],
    },
  },
  children: [
    {
      ...ChildNode.config,
    },
  ],
} as NodeConfig;
