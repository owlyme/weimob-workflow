import React from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import { NODE_TYPE_SET_CONTEXT } from '../../constant';
import { CommonNode } from "../baseNode"

export default function SetContextNode(porps: NodeProps) {
  return <CommonNode {...porps} ></CommonNode>
}

export const setContextconfig:NodeConfig = {
  icon: 'setContextIcon',
  label: 'Set Context',
  nodeType: NODE_TYPE_SET_CONTEXT,
  draggable: true,
  childrenAbleTypes: [],
}



