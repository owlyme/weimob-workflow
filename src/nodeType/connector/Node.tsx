import React from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import { NodeActions } from '../../core';
import { NODE_TYPE_CONNECTOR, CONFIG_KEY } from '../../constant';

export default function ConnectorNode({
  node,
  nodeLevelIndex,
  IconCom,
  disabled,
}: NodeProps) {
  const initData:any = node[CONFIG_KEY]

  return (
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
  );
}

ConnectorNode.config = {
  icon: 'connectorIcon',
  label: 'Connector',
  nodeType: NODE_TYPE_CONNECTOR,
  draggable: true,
  childrenAbleTypes: [],
} as NodeConfig;
