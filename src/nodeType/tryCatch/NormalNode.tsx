import React, { useEffect } from 'react';
import { NODE_TYPE_TRY_NORMAL, CONFIG_KEY } from '../../constant';
import { NodeProps, NodeConfig } from '../../core/types';
import { DropNode } from "../baseNode"

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

export default function Normal(props: NodeProps) {
  const {
    node,
    nodeLevelIndex,
    dispatch,
  } = props;

  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodeConfigStatus',
      payload: {
        nodeLevelIndex,
        status: !!(node.children && node.children.length),
      },
    });
  }, [node, nodeLevelIndex, dispatch]);

  return <DropNode {...props}></DropNode>
}

export const config = createConfig();
