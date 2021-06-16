import React, { useState, useEffect } from 'react';
import { NODE_TYPE_CHOICE_WHEN } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import {
  AddBtnOnline,
  NodeActions,
  parseIndex,
  DropContainer,
} from '../../core';
import { PurePlaceholder } from '../nodePlaceholder/Node';

const createConfig = (): NodeConfig => ({
  label: 'When',
  nodeType: NODE_TYPE_CHOICE_WHEN,
  draggable: false,
  noEdge: true,
  childrenFlex: true,
  deleteForbidden: false,
  children: [],
});

export default function When({
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
        configCompleteStatus: node.weimobConfigSaved && node.children && node.children.length,
        deleteForbidden: parentNode && parentNode?.children && parentNode.children?.length <= 2,
      },
    });
  }, [node, nodeLevelIndex, parentNode, dispatch]);

  const [isDragEnter, setIsDragEnter] = useState(false);
  const addChildren = (evt: MouseEvent) => {
    evt.stopPropagation();
    const node = {
      ...createConfig(),
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
      className="when-container"
      node={node}
      dispatch={dispatch}
      workFlow={workFlow}
      nodeLevelIndex={nodeLevelIndex}
      onContainerDragEnter={setIsDragEnter}
      onContainerDragLeave={setIsDragEnter}
    >
      <div className="node-container-header">
        <div>{`When-${index}`}</div>
        {parentNode?.children && parentNode?.children.length > 2 && !disabled && (
          <NodeActions node={node} nodeLevelIndex={nodeLevelIndex} />
        )}
      </div>

      {node.children?.length ? (
        children
      ) : (
        <PurePlaceholder>
          {isDragEnter && <IconCom type={workFlow.dragNodeData?.node?.icon} />}
        </PurePlaceholder>
      )}

      <AddBtnOnline onAddNode={addChildren} />
    </DropContainer>
  );
}

When.config = createConfig();
