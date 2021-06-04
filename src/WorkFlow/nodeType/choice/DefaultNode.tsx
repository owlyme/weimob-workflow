import React, { useState } from 'react';
import { NODE_TYPE_CHOICE_DEFAULT, CONFIG_KEY } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import { PurePlaceholder } from '../nodePlaceholder/Node';
import { DropContainer } from '../../core';

const createConfig = (): NodeConfig => ({
  label: 'Defalut',
  nodeType: NODE_TYPE_CHOICE_DEFAULT,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  [CONFIG_KEY]: { conditionType: 'default' },
  showChildAtions: 'always',
  deleteForbidden: true,
  children: [
    // {
    //   ...NodePlaceholderConfig,
    // },
  ],
});
export default function Default({
  node,
  nodeLevelIndex,
  dispatch,
  workFlow,
  IconCom,
  children,
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
        <div>Default</div>
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

Default.config = createConfig();
