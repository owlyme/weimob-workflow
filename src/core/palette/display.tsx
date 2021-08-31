import React, {useRef, useState, useCallback} from 'react';
import NodeContainer from '../nodeContainer';
import Edge from '../edge';
import IconCom from '../images/icons';
import { NodeConfig } from '../types';
import Polyline, { getPosition } from './../arrow/Polyline';
import mutationObserver from "../utils/mutationObserver";
import Node from "../../nodeType"
import './style.less';

export default function displayHOC(NodeElement?: any) {
  const Display = ({ workFlow }: any) => {
    const disabled = true;
    const dispatch = (f: any): void => f;

    if (!NodeElement) {
      NodeElement = Node
      console.error('Palette必须要有Node参数 Node是ReactElement');
      return null;
    }

    const elements = useRef<any>({})
    const [rectStyle, setRectStyle] = useState<any>({})

    const debounceContianerScrollTo = useCallback(() => {
      setRectStyle(getPosition(elements.current))
    }, []);

    const onCollapseAction = useCallback(() => {
      mutationObserver(
        () => setRectStyle(getPosition(elements.current))
      )
    }, [])

    const renderNodeList = (parentNode: NodeConfig,  disabled: boolean, levelIndex = '0') => {
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
              onAfterNodeMounted={debounceContianerScrollTo}
            >
              <Node
                node={node}
                nodeLevelIndex={`${levelIndex}-${index}`}
                dispatch={dispatch}
                workFlow={workFlow}
                parentNode={parentNode}
                disabled={disabled}
                IconCom={IconCom}
                onCollapseAction={onCollapseAction}
              >
                {node.children && (
                  <div
                    className={`node-children ${node.nodeType}-children`}
                    style={{ display: node.childrenFlex ? 'flex' : 'block' }}
                  >
                    {renderNodeList(node, disabled, `${levelIndex}-${index}`)}
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
        ref={elements}
        className="node-layout-box"
      >
        <div
          className="node-layout"
          id="workflow-nodes-layout"
        >
          {renderNodeList(workFlow.workFlowNodes || {}, disabled)}
        </div>

        {
          workFlow.endNode && <div className="node-layout" id="end">
            {renderNodeList({
              children: [
                workFlow.endNode
              ]
            } as NodeConfig, disabled)}
          </div>
        }

        <Polyline style={rectStyle} />
      </div>
    );
  }
  return Display
}

