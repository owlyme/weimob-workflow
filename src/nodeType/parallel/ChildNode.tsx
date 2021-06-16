import React, { useState, useEffect } from 'react';
import { NODE_TYPE_PARALLEL_CHILD } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import {
  AddBtnOnline,
  parseIndex,
  NodeActions,
  DropContainer,
} from '../../core';
import { PurePlaceholder } from '../nodePlaceholder/Node';

const config: NodeConfig = {
  label: 'child',
  nodeType: NODE_TYPE_PARALLEL_CHILD,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  deleteForbidden: true,
  children: [],
};

export default function ChildNode({
  node,
  nodeLevelIndex,
  children,
  dispatch,
  parentNode,
  workFlow,
  disabled,
  IconCom,
}: NodeProps) {
  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodePorpertiesAndValues',
      payload: {
        nodeLevelIndex,
        configCompleteStatus: node?.children && node?.children.length,
        deleteForbidden: parentNode?.children && parentNode?.children.length <= 1,
      },
    });
  }, [node, nodeLevelIndex, parentNode, dispatch]);

  const [isDragEnter, setIsDragEnter] = useState(false);
  const addChildren = (evt: MouseEvent) => {
    evt.stopPropagation();

    const node = {
      ...config,
    };

    dispatch({
      type: 'workFlow/insertBrotherNode',
      payload: {
        node,
        nodeLevelIndex,
      },
    });
  };
  const index = parseIndex(nodeLevelIndex).pop();

  return (
    <DropContainer
      node={node}
      dispatch={dispatch}
      workFlow={workFlow}
      nodeLevelIndex={nodeLevelIndex}
      onContainerDragEnter={setIsDragEnter}
      onContainerDragLeave={setIsDragEnter}
    >
      <div className="parallel-child-container">
        <div className="node-container-header">
          <div>{`Pipeline-${index}`}</div>
          {parentNode?.children && parentNode?.children.length > 1 && !disabled && (
            <NodeActions node={node} nodeLevelIndex={nodeLevelIndex} />
          )}
        </div>

        {node.children?.length ? (
          children
        ) : (
          <PurePlaceholder>
            {isDragEnter && (
              <IconCom type={workFlow.dragNodeData?.node?.icon} />
            )}
          </PurePlaceholder>
        )}

        <AddBtnOnline onAddNode={addChildren} />
      </div>
    </DropContainer>
  );
}

ChildNode.config = {
  ...config,
};
