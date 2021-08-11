import React from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import { NODE_TYPE_SET_PAYLOAD } from '../../constant';
import { CommonNode } from "../baseNode"

export default function SetPayloadNode(porps: NodeProps) {
  return <CommonNode {...porps} ></CommonNode>
}

export const setPayloadconfig:NodeConfig = {
  icon: 'setPayloadIcon',
  label: 'Set Payload',
  nodeType: NODE_TYPE_SET_PAYLOAD,
  draggable: true,
  childrenAbleTypes: [],
}

