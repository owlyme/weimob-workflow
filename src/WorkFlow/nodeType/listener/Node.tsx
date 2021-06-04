import React from 'react';
import Form from './Form';
import { NodeProps, NodeConfig } from '../../core/types';
import { NodeActions } from '../../core';
import { NODE_TYPE_LISTENER, CONFIG_KEY } from '../../constant';

export default function ListenerNode({
  node,
  nodeLevelIndex,
  disabled,
  IconCom,
}: NodeProps) {
  const initData = node[CONFIG_KEY] || { cfg: { protocol: 'dubbo', cfg: {} } };
  const { desc } = initData;
  return (
    <>
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
    </>
  );
}

ListenerNode.Form = Form;
ListenerNode.config = {
  icon: 'listenerIcon',
  label: 'Listener',
  nodeType: NODE_TYPE_LISTENER,
  draggable: false,
  childrenAbleTypes: [],
} as NodeConfig;
