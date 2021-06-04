import React from 'react';
import When from './WhenNode';
import Default from './DefaultNode';
import Form from './Form';
import { NodeProps, NodeConfig } from '../../core/types';
import {
  NODE_TYPE_CHOICE,
  NODE_TYPE_CHOICE_WHEN,
  NODE_TYPE_CHOICE_DEFAULT,
  CONFIG_KEY,
} from '../../constant';
import { NodeActions, CollapseContainer } from '../../core';

export default function ChoiceNode({
  node,
  nodeLevelIndex,
  children,
  parentNode,
  disabled,
  IconCom,
}: NodeProps) {
  const initData = node[CONFIG_KEY];
  const { desc } = initData;
  return (
    <>
      <CollapseContainer
        header={
          <div className="node-container-header">
            <IconCom type={node.icon} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="node-name">{node.label}</span>
              <span className="node-desc">{desc}</span>
            </div>
            {!disabled && (
              <NodeActions node={node} nodeLevelIndex={nodeLevelIndex} />
            )}
          </div>
        }
      >
        <div>{children}</div>
      </CollapseContainer>
    </>
  );
}

ChoiceNode.When = When;
ChoiceNode.Default = Default;
ChoiceNode.Form = Form;
ChoiceNode.config = {
  icon: 'choiceIcon',
  label: 'Choice',
  nodeType: NODE_TYPE_CHOICE,
  draggable: true,
  configCompleteStatus: true,
  childrenAbleTypes: [NODE_TYPE_CHOICE_WHEN, NODE_TYPE_CHOICE_DEFAULT],
  [CONFIG_KEY]: {
    cfg: {
      conditions: [],
    },
  },
  children: [
    {
      ...When.config,
    },
    {
      ...Default.config,
    },
  ],
} as NodeConfig;
