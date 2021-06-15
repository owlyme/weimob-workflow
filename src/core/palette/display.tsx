import React from 'react';
import NodeContainer from '../nodeContainer';
import Edge from '../edge';
import IconCom from '../images/icons';
import { NodeConfig } from '../types';


import './style.less';

export default function displayHOC(Node:any) {
  const Display = ({ workFlow }: any) => {
    const disabled = true;
    const dispatch = (f: any): void => f;

    if (!Node) {
      console.error('Palette必须要有Node参数 Node是ReactElement');
      return null;
    }

    const renderNodeList = (parentNode: NodeConfig, levelIndex = '0') => {
      const list = (parentNode.children || []).map(
        (node: NodeConfig, index: number) => (
          <div
            className={`node-edge-conatiner ${node.nodeType}-parent`}
            key={node.nodeId}
          >
            <NodeContainer
              nodeLevelIndex={`${levelIndex}-${index}`}
              node={node}
              className="node-container"
              disabled={disabled}
              dispatch={dispatch}
              workFlow={workFlow}
            >
              <Node
                node={node}
                nodeLevelIndex={`${levelIndex}-${index}`}
                dispatch={dispatch}
                workFlow={workFlow}
                parentNode={parentNode}
                disabled={disabled}
                IconCom={IconCom}
              >
                {node.children && (
                  <div
                    className={`node-children ${node.nodeType}-children`}
                    style={{ display: node.childrenFlex ? 'flex' : 'block' }}
                  >
                    {renderNodeList(node, `${levelIndex}-${index}`)}
                  </div>
                )}
              </Node>

            </NodeContainer>
            {!node.noEdge && (
              <Edge
                node={node}
                nodeLevelIndex={`${levelIndex}-${index}`}
                dispatch={dispatch}
                workFlow={workFlow}
                parentNode={parentNode}
                disabled={disabled}
              />
            )}
          </div>
        ),
      );

      return list;
    };

    return (
      <div
        className="node-layout-box"
      >
        <div
          className="node-layout"
          id="workflow-nodes-layout"
        >
          {renderNodeList(workFlow.workFlowNodes || {})}
        </div>
      </div>
    );
  }
  return Display
}

