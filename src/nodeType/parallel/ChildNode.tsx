import React, { useEffect } from 'react';
import { NODE_TYPE_PARALLEL_CHILD } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import { DropNode } from "../baseNode"

export const config: NodeConfig = {
  label: 'child',
  nodeType: NODE_TYPE_PARALLEL_CHILD,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  deleteForbidden: true,
  children: [],
};

export default function ChildNode(props: NodeProps) {
  const {
    node,
    nodeLevelIndex,
    dispatch,
    parentNode,
    disabled,
  } = props
  const deleteForbidden = parentNode?.children && parentNode?.children.length <= 1;
  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodePorpertiesAndValues',
      payload: {
        nodeLevelIndex,
        configCompleteStatus: node?.children && node?.children.length,
        deleteForbidden
      },
    });
  }, [node, nodeLevelIndex, parentNode, dispatch]);

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

  return (
    <DropNode 
    {...props}
    disabled={deleteForbidden && !disabled}
    showIndex
    onAddChildren={addChildren}>
    </DropNode>
  );
}
