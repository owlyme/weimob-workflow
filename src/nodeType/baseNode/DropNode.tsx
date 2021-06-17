import React, { useState, useEffect } from 'react';
import { NODE_TYPE_CHOICE_WHEN, NODE_TYPE_CHOICE_DEFAULT, CONFIG_KEY } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import {
  AddBtnOnline,
  NodeActions,
  parseIndex,
  DropContainer,
} from '../../core';
import { PurePlaceholder } from '../nodePlaceholder/Node';


export default function DropNode({
  node,
  nodeLevelIndex,
  dispatch,
  workFlow,
  IconCom,
  children,
  header,
  footer,
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
      { header }
      {node.children?.length ? (
        children
      ) : (
        <PurePlaceholder>
          {isDragEnter && <IconCom type={workFlow.dragNodeData?.node?.icon} />}
        </PurePlaceholder>
      )}
      { footer }
    </DropContainer>
  );
}


export  function MultiDropNode(props: NodeProps) {
  const {
    node,
    nodeLevelIndex,
    children,
    dispatch,
    parentNode,
    workFlow,
    disabled,
    IconCom,
  } = props;
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
    <DropNode
      {...props}
      header={
        <div className="node-container-header">
          <div>{`When-${index}`}</div>
          {parentNode?.children && parentNode?.children.length > 2 && !disabled && (
            <NodeActions 
            node={node}
            dispatch={dispatch}
            nodeLevelIndex={nodeLevelIndex} />
          )}
        </div>
      }
      footer={<AddBtnOnline onAddNode={addChildren} />}
    >
    </DropNode>
  );
}








