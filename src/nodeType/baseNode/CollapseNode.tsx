import React, { useRef } from 'react';
import { Collapse } from 'antd';
import { NodeProps } from '../../core/types';
import {
  CONFIG_KEY,
} from '../../constant';
import { NodeActions } from '../../core';

const { Panel } = Collapse;

export default  function CollapseNode({
  node,
  nodeLevelIndex,
  children,
  disabled,
  IconCom,
  dispatch,
  onCollapseAction= (f:any) => f
}: NodeProps) {
  const initData: any = node[CONFIG_KEY];
  const ele = useRef<HTMLDivElement>(null)
  return (
    <div ref={ele} className="collapse-node">
    <Collapse defaultActiveKey={['1']}  ghost onChange={() => onCollapseAction(ele.current)}>
      <Panel
        key="1"
        header={
          <div className="node-container-header" style={{display: "inline-flex"}}>
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
    </div>
  );
}



