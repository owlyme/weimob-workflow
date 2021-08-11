import React from 'react';
import { NodeProps, NodeConfig } from '../../core/types';
import { NODE_TYPE_REDIS } from '../../constant';
import { CommonNode } from "../baseNode"

export default function RedisNode(porps: NodeProps) {
  return <CommonNode {...porps} ></CommonNode>
}

export const redisconfig:NodeConfig = {
  icon: 'redisIcon',
  label: 'Redis',
  nodeType: NODE_TYPE_REDIS,
  draggable: true,
  childrenAbleTypes: [],
}
