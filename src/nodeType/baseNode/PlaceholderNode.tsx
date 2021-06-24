import React from 'react';
import { NodeActions } from '../../core';
import { NodeProps, NodeConfig } from '../../core/types';
import { NODE_TYPE_PLACEHOLDER } from '../../constant';

export default function NodePlaceholder({
  node,
  nodeLevelIndex,
  parentNode,
}: NodeProps) {
  return (
      <div className="weimobworkflow-node-container-header">
        <div>请选择流程节点：</div>
        {(parentNode?.showChildAtions ||
          parentNode?.root ||
          (parentNode?.children && parentNode?.children?.length > 1)) && (
          <NodeActions node={node} nodeLevelIndex={nodeLevelIndex} />
        )}
      </div>
  );
}

export const NodePlaceholderConfig: NodeConfig = {
  label: 'Placeholder',
  nodeType: NODE_TYPE_PLACEHOLDER,
  configCompleteStatus: false,
};

NodePlaceholder.config = NodePlaceholderConfig;

export const PurePlaceholder = ({ children }:any) => (
  <div className="weimobworkflow-node-container-header">{children || '请选择流程节点'}</div>
);
