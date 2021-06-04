import React, { useState } from 'react';
import { NODE_TYPE_TRY_FINALLY, CONFIG_KEY } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import { DropContainer } from '../../core';
import { PurePlaceholder } from '../nodePlaceholder/Node';

const createConfig = (): NodeConfig => ({
  label: 'Finally',
  nodeType: NODE_TYPE_TRY_FINALLY,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  showChildAtions: 'always',
  deleteForbidden: true,
  [CONFIG_KEY]: { conditionType: 'finally' },
  children: [
    // {
    //   ...NodePlaceholderConfig,
    // },
  ],
});
export default function Finally({
  node,
  nodeLevelIndex,
  children,
  workFlow,
  dispatch,
  IconCom,
}: NodeProps) {
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
        <div style={{ fontSize: 12 }}>Finally</div>
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

Finally.config = createConfig();
