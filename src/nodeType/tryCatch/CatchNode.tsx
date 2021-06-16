import React, { useState, useEffect } from 'react';
import { NODE_TYPE_TRY_CATCH, CONFIG_KEY } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import {
  AddBtnOnline,
  NodeActions,
  parseIndex,
  DropContainer,
} from '../../core';
import { PurePlaceholder } from '../nodePlaceholder/Node';

const createConfig = (): NodeConfig => ({
  label: 'Catch',
  nodeType: NODE_TYPE_TRY_CATCH,
  draggable: false,
  noEdge: true,
  childrenFlex: true,
  deleteForbidden: false,
  [CONFIG_KEY]: { conditionType: 'catch', catchClassNames: [] },
  children: [],
});

export default function Catch({
  node,
  nodeLevelIndex,
  children,
  dispatch,
  workFlow,
  parentNode,
  IconCom,
  disabled,
}: NodeProps) {
  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodeConfigStatus',
      payload: {
        nodeLevelIndex,
        status: node.weimobConfigSaved && node.children && node.children.length,
      },
    });
  }, [node, nodeLevelIndex, dispatch]);

  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodePorpertiesAndValues',
      payload: {
        nodeLevelIndex,
        configCompleteStatus: node.weimobConfigSaved && node.children && node.children.length,
        deleteForbidden: parentNode?.children && parentNode?.children.length <= 3,
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

  const index:number = parseIndex(nodeLevelIndex).pop() || 0;

  return (
    <DropContainer
      node={node}
      dispatch={dispatch}
      workFlow={workFlow}
      nodeLevelIndex={nodeLevelIndex}
      onContainerDragEnter={setIsDragEnter}
      onContainerDragLeave={setIsDragEnter}
    >
      <div className="catch-container">
        <div className="node-container-header">
          <div style={{ fontSize: 12 }}>{`Catch-${index - 1}`}</div>
          {parentNode?.children && parentNode?.children.length > 3 && !disabled && (
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

Catch.config = createConfig();
