import React from 'react';
import { NodePlaceholder, UndefinedNode } from './baseNode';
import ListenerNode, { ListenerConfig } from './listener';
import EndNode, { EndConfig } from './end';
import { ChoiceNode, choiceConfig, WhenNode, DefaultNode } from './choice';
import ProcessorNode, { processorconfig } from './processor';
import { ParallelNode, ParallelChildNode, parallelConfig } from './parallel';
import { AsyncNode, AsyncChildNode, asyncConfig } from './async';
import { TryCatchNode, NormalNode, FinallyNode, CatchNode, tryCatchConfig } from './tryCatch';
import ConnectorNode, { connectorConfig } from './connector';
import Transformer, { transformerConfig } from './transformer';
import MqNode, { MqConfig } from './mq';
import ArtemisNode, { ArtemisConfig } from './artemis';
import ObjectStoreNode, { ObjectStoreConfig } from './objectStore';

import {
  NODE_TYPE_LISTENER,
  NODE_TYPE_PROCESSOR,
  NODE_TYPE_CHOICE,
  NODE_TYPE_CHOICE_WHEN,
  NODE_TYPE_CHOICE_DEFAULT,
  NODE_TYPE_PARALLEL,
  NODE_TYPE_PARALLEL_AGGR,
  NODE_TYPE_PARALLEL_CHILD,
  NODE_TYPE_PLACEHOLDER,
  NODE_TYPE_TRY,
  NODE_TYPE_TRY_NORMAL,
  NODE_TYPE_TRY_CATCH,
  NODE_TYPE_TRY_FINALLY,
  NODE_TYPE_CONNECTOR,
  NODE_TYPE_TRANSFORMER,
  NODE_TYPE_ASYNC,
  NODE_TYPE_ASYNC_CHILD,
  NODE_TYPE_END,
  NODE_TYPE_MQ,
  NODE_TYPE_ARTEMIS,
  NODE_TYPE_OBJECT_STORE,
} from '../constant';

import { NodeProps, NodeConfig } from '../core/types';

export const NodeTypeComponents = {
  [NODE_TYPE_LISTENER]: ListenerNode,
  [NODE_TYPE_PROCESSOR]: ProcessorNode,
  [NODE_TYPE_CHOICE]: ChoiceNode,
  [NODE_TYPE_CHOICE_WHEN]: WhenNode,
  [NODE_TYPE_CHOICE_DEFAULT]: DefaultNode,
  [NODE_TYPE_PARALLEL]: ParallelNode,
  [NODE_TYPE_PARALLEL_AGGR]: ParallelNode,
  [NODE_TYPE_PARALLEL_CHILD]: ParallelChildNode,
  [NODE_TYPE_PLACEHOLDER]: NodePlaceholder,
  [NODE_TYPE_TRY]: TryCatchNode,
  [NODE_TYPE_TRY_NORMAL]: NormalNode,
  [NODE_TYPE_TRY_CATCH]: CatchNode,
  [NODE_TYPE_TRY_FINALLY]: FinallyNode,
  [NODE_TYPE_TRANSFORMER]: Transformer,
  [NODE_TYPE_CONNECTOR]: ConnectorNode,
  [NODE_TYPE_ASYNC]: AsyncNode,
  [NODE_TYPE_ASYNC_CHILD]: AsyncChildNode,
  [NODE_TYPE_END]: EndNode,
  [NODE_TYPE_MQ]: MqNode,
  [NODE_TYPE_ARTEMIS]: ArtemisNode,
  [NODE_TYPE_OBJECT_STORE]: ObjectStoreNode
};

export const NodeTypeConfigs = {
  [NODE_TYPE_LISTENER]: ListenerConfig,
  [NODE_TYPE_PROCESSOR]: processorconfig,
  [NODE_TYPE_CHOICE]: choiceConfig,
  [NODE_TYPE_PARALLEL]: parallelConfig,
  [NODE_TYPE_TRY]: tryCatchConfig,
  [NODE_TYPE_CONNECTOR]: connectorConfig,
  [NODE_TYPE_TRANSFORMER]: transformerConfig,
  [NODE_TYPE_ASYNC]: asyncConfig,
  [NODE_TYPE_END]: EndConfig,
  [NODE_TYPE_MQ]: MqConfig,
  [NODE_TYPE_ARTEMIS]: ArtemisConfig,
  [NODE_TYPE_OBJECT_STORE]: ObjectStoreConfig
};

function getNodeTypeComp(nodeType: any) {
  return NodeTypeComponents[nodeType]
    ? NodeTypeComponents[nodeType]
    : UndefinedNode;
}

interface UseProps {
  nodeType: string;
  node?: React.ReactElement;
  form?: React.ReactElement;
  config: NodeConfig;
}

export function registerNode(params: UseProps[]): void {
  (params || []).forEach(({ nodeType, node, config }) => {
    if (!nodeType) {
      console.error('registerNode param need nodeType');
    } else {
      node && (NodeTypeComponents[nodeType] = node);
      config && (NodeTypeConfigs[nodeType] = config);
    }
  })
}

export default function Node(props: NodeProps) {
  const { node } = props;
  const Node = getNodeTypeComp(node.nodeType);
  return (
    <div>
      <Node {...props} />
    </div>
  );
}
