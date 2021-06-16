import React, { useState, useEffect } from 'react';
import { NODE_TYPE_TRY_NORMAL, CONFIG_KEY } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import { PurePlaceholder } from '../nodePlaceholder/Node';
import { DropContainer } from '../../core';

const createConfig = (): NodeConfig => ({
  label: 'Normal',
  nodeType: NODE_TYPE_TRY_NORMAL,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  [CONFIG_KEY]: { conditionType: 'normal' },
  deleteForbidden: true,
  children: [],
});
export default function Normal({
  node,
  nodeLevelIndex,
  dispatch,
  workFlow,
  children,
  IconCom,
}: NodeProps) {
  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodeConfigStatus',
      payload: {
        nodeLevelIndex,
        status: !!(node.children && node.children.length),
      },
    });
  }, [node, nodeLevelIndex, dispatch]);

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
      <div className="node-container-header">
        <div style={{ fontSize: 12 }}>Normal</div>
      </div>

      {node.children?.length ? (
        children
      ) : (
        <PurePlaceholder>
          {isDragEnter && <IconCom type={workFlow.dragNodeData?.node?.icon} />}
        </PurePlaceholder>
      )}
    </DropContainer>
  );
}

Normal.config = createConfig();
