import React from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import { NodeActions } from '../../core';
import { NODE_TYPE_PROCESSOR, CONFIG_KEY } from '../../constant';

export default function ProcessorNode({
  node,
  nodeLevelIndex,
  disabled,
  IconCom,
  dispatch,
  Extension
}: NodeProps) {
  const initData:any = node[CONFIG_KEY] 
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
            nodeLevelIndex={nodeLevelIndex}
          />
        )}
      </div>
      {Extension}
    </div>
  );
}

ProcessorNode.config = {
  icon: 'processorIcon',
  label: 'Processor',
  nodeType: NODE_TYPE_PROCESSOR,
  draggable: true,
  childrenAbleTypes: [],
} as NodeConfig;
