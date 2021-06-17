import React, { useEffect } from 'react';
import { NODE_TYPE_TRY_CATCH, CONFIG_KEY } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import { DropNode } from "../baseNode"

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
  }, [node, nodeLevelIndex, dispatch]);

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

  return <DropNode
    {...props}
    disabled={deleteForbidden && !disabled}
    showIndex
    onAddChildren={addChildren}>
  </DropNode>
}

export const config = createConfig();
