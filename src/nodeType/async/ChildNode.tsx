import React, { useEffect} from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import {
  NODE_TYPE_ASYNC_CHILD,
} from '../../constant';
import { DropNode } from "../baseNode"

export const config: NodeConfig = {
  // label: 'async-workflow',
  nodeType: NODE_TYPE_ASYNC_CHILD,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  deleteForbidden: true,
  children: []
};

export default function ChildNode(props: NodeProps) {
  const {
    node,
    nodeLevelIndex,
    dispatch
  } = props;


  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodePorpertiesAndValues',
      payload: {
        nodeLevelIndex,
        configCompleteStatus: node.children && node.children.length,
      },
    });
  }, [node?.children?.length, nodeLevelIndex, dispatch]);

  return (
    <DropNode 
    {...props}
    disabled={true}>
    </DropNode>
  );
}
