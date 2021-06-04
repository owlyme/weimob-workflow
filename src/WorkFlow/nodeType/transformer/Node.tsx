import React from 'react';
import Form from './Form';
import { NodeProps, NodeConfig } from '../../core/types';
import { NodeActions } from '../../core';
import { NODE_TYPE_TRANSFORMER, CONFIG_KEY } from '../../constant';

export default function TransformerNode({
  node,
  nodeLevelIndex,
  parentNode,
  IconCom,
  disabled,
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

TransformerNode.Form = Form;
TransformerNode.config = {
  icon: 'transformerIcon',
  label: 'Transformer',
  nodeType: NODE_TYPE_TRANSFORMER,
  draggable: true,
  childrenAbleTypes: [],
} as NodeConfig;
