import React from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import { NodeActions } from '../../core';
import { NODE_TYPE_LISTENER, CONFIG_KEY } from '../../constant';

export const config: NodeConfig = {
  icon: 'listenerIcon',
  label: 'Listener',
  nodeType: NODE_TYPE_LISTENER,
  draggable: false,
  childrenAbleTypes: [],
}

export default function CommonNode({
  node,
  nodeLevelIndex,
  disabled,
  IconCom,
  children,
  dispatch
}: NodeProps) {
  const initData: any = node[CONFIG_KEY]

  return (
    <div>
      <div className="node-container-header">
        <IconCom type={node.icon} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="node-name">{node.label}</span>
          <span className="node-desc">{initData?.desc}</span>
        </div>

        {!disabled && (
          <NodeActions
            node={node}
            dispatch={dispatch}
            nodeLevelIndex={nodeLevelIndex} />
        )}

      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
