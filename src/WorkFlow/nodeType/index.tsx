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

export const NodeTypeForms = {
  [NODE_TYPE_LISTENER]: ListenerNode.Form,
  [NODE_TYPE_PROCESSOR]: ProcessorNode.Form,
  [NODE_TYPE_CHOICE]: ChoiceNode.Form,
  [NODE_TYPE_CHOICE_WHEN]: ChoiceNode.Form.WhenForm,
  [NODE_TYPE_CHOICE_DEFAULT]: ChoiceNode.Form.DefaultForm,
  [NODE_TYPE_PARALLEL]: ParallelNode.Form,
  [NODE_TYPE_TRY]: TryCatchNode.Form,
  [NODE_TYPE_TRY_CATCH]: TryCatchNode.Form.CatchForm,
  [NODE_TYPE_TRANSFORMER]: Transformer.Form,
  [NODE_TYPE_CONNECTOR]: ConnectorNode.Form,
};

export const NodeTypeConfigs = [
  ListenerNode.config,
  ProcessorNode.config,
  ChoiceNode.config,
  ParallelNode.config,
  TryCatchNode.config,
  ConnectorNode.config,
  Transformer.config,
];

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
export function use(param: UseProps):void {
  const { nodeType, node, form, config } = param;
  if (!nodeType) {
    console.error('use param need nodeType');
    return;
  }
  NodeTypeComponents[nodeType] = node;
  NodeTypeForms[nodeType] = form;
  NodeTypeConfigs.push(config);
  return;
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
