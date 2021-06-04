import React from 'react';
import Normal from './NormalNode';
import Catch from './CatchNode';
import Finally from './FinallyNode';
import Form from './Form';
import { NodeProps, NodeConfig } from '../../core/types';
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
  parentNode,
  disabled,
  IconCom,
}: NodeProps) {
  const initData = node[CONFIG_KEY] || { cfg: { protocol: 'dubbo', cfg: {} } };
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
TryCatchNode.Form = Form;
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
} as NodeConfig;
