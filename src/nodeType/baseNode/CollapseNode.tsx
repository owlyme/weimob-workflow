import React from 'react';
import { Collapse } from 'antd';
import { NodeProps } from '../../core/types';
import {
  CONFIG_KEY,
} from '../../constant';
import { NodeActions } from '../../core';

const { Panel } = Collapse;

export default function CollapseNode({
  node,
  nodeLevelIndex,
  children,
  disabled,
  IconCom,
  dispatch,
}: NodeProps) {
  const initData: any = node[CONFIG_KEY];
  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <Panel
        key="1"
        header={
          <div className="node-container-header">
            <IconCom type={node.icon} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="node-name">{node.label}</span>
              <span className="node-desc">{initData?.desc}</span>
            </div>
            {!disabled && (
              <NodeActions 
              node={node} 
              dispatch={dispatch}
              nodeLevelIndex={nodeLevelIndex} />
            )}
          </div>
        }
      >
        <div>{children}</div>
      </Panel>
    </Collapse>
  );
}
