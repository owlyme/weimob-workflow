import React from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import {
  NODE_TYPE_ASYNC_CHILD,
  CONFIG_KEY,
} from '../../constant';
import { DropNode } from "../baseNode"

export const config: NodeConfig = {
  label: 'async-workflow',
  nodeType: NODE_TYPE_ASYNC_CHILD,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  deleteForbidden: true,
  children: [],
  [CONFIG_KEY] : {}
};

export default function ChildNode(props: NodeProps) {
  return (
    <DropNode 
    {...props}
    disabled={true}>
    </DropNode>
  );
}
