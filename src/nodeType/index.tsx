import React from 'react';
import NodePlaceholder from './nodePlaceholder/Node';
import NodeTypeUndefined from './nodeTypeUndefined/Node';
import ListenerNode from './listener/Node';
import ChoiceNode from './choice/Node';
import ProcessorNode from './processor/Node';
import ParallelNode from './parallel/Node';
import TryCatchNode from './tryCatch/Node';
import ConnectorNode from './connector/Node';
import Transformer from './transformer/Node';

import {
  NODE_TYPE_LISTENER,
  NODE_TYPE_PROCESSOR,
  NODE_TYPE_CHOICE,
  NODE_TYPE_CHOICE_WHEN,
  NODE_TYPE_CHOICE_DEFAULT,
  NODE_TYPE_PARALLEL,
  NODE_TYPE_PARALLEL_CHILD,
  NODE_TYPE_PLACEHOLDER,
  NODE_TYPE_TRY,
  NODE_TYPE_TRY_NORMAL,
  NODE_TYPE_TRY_CATCH,
  NODE_TYPE_TRY_FINALLY,
  NODE_TYPE_CONNECTOR,
  NODE_TYPE_TRANSFORMER,
} from '../constant';
import { NodeProps, NodeConfig } from '../core/types';

export const NodeTypeComponents = {
  [NODE_TYPE_LISTENER]: ListenerNode,
  [NODE_TYPE_PROCESSOR]: ProcessorNode,
  [NODE_TYPE_CHOICE]: ChoiceNode,
  [NODE_TYPE_CHOICE_WHEN]: ChoiceNode.When,
  [NODE_TYPE_CHOICE_DEFAULT]: ChoiceNode.Default,
  [NODE_TYPE_PARALLEL]: ParallelNode,
  [NODE_TYPE_PARALLEL_CHILD]: ParallelNode.ChildNode,
  [NODE_TYPE_PLACEHOLDER]: NodePlaceholder,
  [NODE_TYPE_TRY]: TryCatchNode,
  [NODE_TYPE_TRY_NORMAL]: TryCatchNode.Normal,
  [NODE_TYPE_TRY_CATCH]: TryCatchNode.Catch,
  [NODE_TYPE_TRY_FINALLY]: TryCatchNode.Finally,
  [NODE_TYPE_TRANSFORMER]: Transformer,
  [NODE_TYPE_CONNECTOR]: ConnectorNode,
};

export const NodeTypeConfigs = {
  [NODE_TYPE_LISTENER]: ListenerNode.config,
  [NODE_TYPE_PROCESSOR]: ProcessorNode.config,
  [NODE_TYPE_CHOICE]: ChoiceNode.config,
  [NODE_TYPE_PARALLEL]: ParallelNode.config,
  [NODE_TYPE_TRY]: TryCatchNode.config,
  [NODE_TYPE_CONNECTOR]: ConnectorNode.config,
  [NODE_TYPE_TRANSFORMER]: Transformer.config,
};

function getNodeTypeComp(nodeType:any) {
  return NodeTypeComponents[nodeType]
    ? NodeTypeComponents[nodeType]
    : NodeTypeUndefined;
}

interface UseProps {
  nodeType: string;
  node?: React.ReactElement;
  form?: React.ReactElement;
  config: NodeConfig;
}

export function registerNode(param: UseProps):void {
  const { nodeType, node, config } = param;
  if (!nodeType) {
    console.error('registerNode param need nodeType');
  } else {
    node && (NodeTypeComponents[nodeType] = node);
    config && (NodeTypeConfigs[nodeType] = config);
  }
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