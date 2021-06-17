import React, { useEffect } from 'react';
import { NODE_TYPE_CHOICE_WHEN } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import { DropNode } from "../baseNode"

const createConfig = (): NodeConfig => ({
  label: 'When',
  nodeType: NODE_TYPE_CHOICE_WHEN,
  draggable: false,
  noEdge: true,
  childrenFlex: true,
  deleteForbidden: false,
  children: [],
});

export default function When(props: NodeProps) {
  const {
    node,
    nodeLevelIndex,
    dispatch,
    parentNode,
    disabled,
  } = props;

  const deleteForbidden = parentNode && parentNode?.children && parentNode.children?.length <= 2;
  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodePorpertiesAndValues',
      payload: {
        nodeLevelIndex,
        configCompleteStatus: node.weimobConfigSaved && node.children && node.children.length,
        deleteForbidden
      },
    });
  }, [node, nodeLevelIndex, parentNode, dispatch]);

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

  return (
    <DropNode 
    {...props}
    disabled={deleteForbidden && !disabled}
    showIndex
    onAddChildren={addChildren}>
    </DropNode>
  );
}

export const config = createConfig();
