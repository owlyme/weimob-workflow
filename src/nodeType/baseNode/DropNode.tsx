import React, { useState } from 'react';
import { NodeProps } from '../../core/types';
import {
  DropContainer,
  NodeActions,
  AddBtnOnline,
  parseIndex
} from '../../core';

import { PurePlaceholder } from './PlaceholderNode';

export default function DropNode({
  node,
  nodeLevelIndex,
  dispatch,
  workFlow,
  IconCom,
  children,
  disabled,
  onAddChildren,
  showIndex,
  startIndex = 1
}: NodeProps) {
  const index = parseIndex(nodeLevelIndex).pop();
  const [isDragEnter, setIsDragEnter] = useState(false);

  return (
    <DropContainer
      node={node}
      dispatch={dispatch}
      workFlow={workFlow}
      nodeLevelIndex={nodeLevelIndex}
      onContainerDragEnter={setIsDragEnter}
      onContainerDragLeave={setIsDragEnter}
    >
      <div className="weimobworkflow-node-container-header">
        <div>{ node.label + `${showIndex ? ("-" + (index + startIndex)) : ''}`}</div>
        {showIndex && !disabled && (
          <NodeActions node={node} dispatch={dispatch} nodeLevelIndex={nodeLevelIndex} />
        )}
      </div>

      {node.children?.length ? (
        children
      ) : (
        <PurePlaceholder>
          {isDragEnter && <IconCom type={workFlow.dragNodeData?.node?.icon} />}
        </PurePlaceholder>
      )}
      {
        showIndex  && <AddBtnOnline onAddNode={onAddChildren} />
      }
    </DropContainer>
  );
}


