import React, { useEffect } from 'react';
import { NODE_TYPE_TRY_CATCH } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import { DropNode } from "../baseNode"

const createConfig = (): NodeConfig => ({
  label: 'Catch',
  nodeType: NODE_TYPE_TRY_CATCH,
  draggable: false,
  noEdge: true,
  childrenFlex: true,
  deleteForbidden: false,
  children: [],
  configCompleteStatus: true
});

export default function Catch(props: NodeProps) {
  const {
    node,
    nodeLevelIndex,
    dispatch,
    parentNode,
    disabled,
  } = props;
  
  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodeConfigStatus',
      payload: {
        nodeLevelIndex,
        status: node.weimobConfigSaved && node.children && node.children.length,
      },
    });
  }, [node?.weimobConfigSaved, node?.children?.length, nodeLevelIndex, dispatch]);

  const deleteForbidden = parentNode?.children && parentNode?.children.length <= 3;
  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodePorpertiesAndValues',
      payload: {
        nodeLevelIndex,
        configCompleteStatus: node.weimobConfigSaved && node.children && node.children.length,
        deleteForbidden
      },
    });
  }, [node?.children?.length, nodeLevelIndex, deleteForbidden, dispatch]);

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

  return <DropNode
    {...props}
    disabled={deleteForbidden && !disabled}
    showIndex
    startIndex={0}
    onAddChildren={addChildren}>
  </DropNode>
}

export const config = createConfig();
