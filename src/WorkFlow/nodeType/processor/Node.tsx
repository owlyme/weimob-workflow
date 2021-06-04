import React from 'react';
import Form from './Form';
import Extension from './Extension';
import { NodeProps, NodeConfig } from '../../core/types';
import { NodeActions } from '../../core';
import { NODE_TYPE_PROCESSOR, CONFIG_KEY } from '../../constant';

export default function ProcessorNode({
  node,
  nodeLevelIndex,
  parentNode,
  disabled,
  IconCom,
  dispatch,
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
          <NodeActions
            node={node}
            dispatch={dispatch}
            nodeLevelIndex={nodeLevelIndex}
          />
        )}
      </div>
      <div className="node-container-extension">
        <Extension node={node}></Extension>
      </div>
    </>
  );
}

ProcessorNode.Form = Form;
ProcessorNode.config = {
  icon: 'processorIcon',
  label: 'Processor',
  nodeType: NODE_TYPE_PROCESSOR,
  draggable: true,
  childrenAbleTypes: [],
} as NodeConfig;
