import React from 'react';
import NodeContainer from '../nodeContainer';
import DragContainer from '../dragContainer';
import Edge from '../edge';
import IconCom from '../images/icons';
import DropContainer from '../dropContainer';
import DeleteContainer from '../deleteContainer';
import { NodeConfig } from '../types';
import { debounce } from '../utils';
import './style.less';

export default function paletteHOC (Node:any) {
  const Palette = ({ disabled = false, workFlow, dispatch }: any) => {
    if (!Node) {
      console.error('Palette必须要有Node参数 Node是ReactElement');
      return null;
    }
    function toggoleClassName(nodeId: string) {
      return nodeId === workFlow.currentNode.nodeId
        ? 'node-container selected'
        : 'node-container';
    }
  
    function onLayoutClick() {
      dispatch({
        type: 'workFlow/setCurrentNode',
        payload: {
          node: {},
        },
      });
    }
  
    function contianerScrollTo(targetEle: HTMLElement) {
      targetEle.scrollIntoView();
    }
  
    const debounceContianerScrollTo = debounce(contianerScrollTo);
  
    const renderNodeList = (parentNode: NodeConfig, levelIndex = '0') => {
      const list = (parentNode.children || []).map(
        (node: NodeConfig, index: number) => (
          <div
            className={`node-edge-conatiner ${node.nodeType}-parent`}
            key={node.nodeId}
          >
            <NodeContainer
              node={node}
              className={toggoleClassName(node.nodeId)}
              nodeLevelIndex={`${levelIndex}-${index}`}
              onAfterNodesChange={debounceContianerScrollTo}
              disabled={disabled}
              dispatch={dispatch}
              workFlow={workFlow}
            >
              <DragContainer
                node={node}
                nodeLevelIndex={`${levelIndex}-${index}`}
                parentNode={parentNode}
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
              </DragContainer>
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
      <DeleteContainer
        className="node-layout-box"
        dispatch={dispatch}
        workFlow={workFlow}
        onClick={onLayoutClick}
      >
        <DropContainer
          className="node-layout"
          id="workflow-nodes-layout"
          dispatch={dispatch}
          workFlow={workFlow}
          node={workFlow.workFlowNodes}
          nodeLevelIndex="0"
        >
          {renderNodeList(workFlow.workFlowNodes || {})}
        </DropContainer>
      </DeleteContainer>
    );
  }

  return Palette
}
