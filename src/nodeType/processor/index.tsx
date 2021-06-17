import React from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import { NODE_TYPE_PROCESSOR } from '../../constant';
import { CommonNode } from "../baseNode"

export default function ProcessorNode(porps: NodeProps) {
  return <CommonNode {...porps} >
   
  </CommonNode>
}

export const processorconfig:NodeConfig = {
  icon: 'processorIcon',
  label: 'Processor',
  nodeType: NODE_TYPE_PROCESSOR,
  draggable: true,
  childrenAbleTypes: [],
}



