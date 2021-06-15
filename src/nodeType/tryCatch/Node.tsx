import React from 'react';
import Normal from './NormalNode';
import Catch from './CatchNode';
import Finally from './FinallyNode';
import { NodeProps } from '../../core/types';
import {
  NODE_TYPE_TRY,
  NODE_TYPE_TRY_NORMAL,
  NODE_TYPE_TRY_CATCH,
  NODE_TYPE_TRY_FINALLY,
  CONFIG_KEY,
} from '../../constant';
import { NodeActions, CollapseContainer } from '../../core';

export default function TryCatchNode({
  node,
  nodeLevelIndex,
  children,
  disabled,
  IconCom,
}: NodeProps) {
  const initData:any = node[CONFIG_KEY]
  return (
    <CollapseContainer
      header={
        <div className="node-container-header">
          <IconCom type={node.icon} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="node-name">{node.label}</span>
            <span className="node-desc">{initData?.desc}</span>
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

TryCatchNode.Normal = Normal;
TryCatchNode.Catch = Catch;
TryCatchNode.Finally = Finally;
TryCatchNode.config = {
  icon: 'tryIcon',
  label: 'TryCatch',
  nodeType: NODE_TYPE_TRY,
  draggable: true,
  configCompleteStatus: true,
  childrenAbleTypes: [
    NODE_TYPE_TRY_NORMAL,
    NODE_TYPE_TRY_CATCH,
    NODE_TYPE_TRY_FINALLY,
  ],
  [CONFIG_KEY]: {
    desc: '',
    remark: '',
    cfg: {
      conditions: [],
    },
  },
  children: [
    {
      ...Normal.config,
    },
    {
      ...Catch.config,
    },
    {
      ...Finally.config,
    },
  ],
}
