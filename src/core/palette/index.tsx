import React, { useState, useCallback, useRef, useEffect } from 'react';
import NodeContainer from '../nodeContainer';
import DragContainer from '../dragContainer';
import Edge from '../edge';
import IconCom from '../images/icons';
import DropContainer from '../dropContainer';
import DeleteContainer from '../deleteContainer';
import { NodeConfig } from '../types';
import { debounce } from '../utils';
import Polyline, { getPosition } from './../arrow/Polyline';
import mutationObserver from "../utils/mutationObserver"
import './style.less';

export default function paletteHOC(Node: any) {
  const Palette = ({ disabled = false, workFlow, dispatch, subscribe, changsize }: any) => {
    if (!Node) {
      console.error('Palette必须要有Node参数 Node是ReactElement');
      return null;
    }

    const elements = useRef<any>({})

    const getLayoutRef = (ref: HTMLElement) => {
      elements.current.layout = ref;
    }

    useEffect(() => {
      function fn () { setRectStyle(getPosition(elements.current.layout)) }
      subscribe((_: any, type: any) => {
        if (type === "onDragSortEnd" || type === 'onMoveNode') {
          mutationObserver(fn)
        }
      })

      window.addEventListener('resize', fn);
      return () => {
        window.removeEventListener("resize", fn);
      }
    }, [subscribe]);

    useEffect(() => {
      setRectStyle(getPosition(elements.current.layout))
    }, [changsize])

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

    const [rectStyle, setRectStyle] = useState<any>({})

    const debounceContianerScrollTo = useCallback(debounce((targetEle?: HTMLElement) => {
      if (targetEle) targetEle.scrollIntoView();
      setRectStyle(getPosition(elements.current.layout))
    }, 60), []);

    const onCollapseAction = useCallback(() => {
      mutationObserver(
        () => setRectStyle(getPosition(elements.current.layout))
      )
    }, [])


    const renderNodeList = (parentNode: NodeConfig, disabled: boolean, levelIndex = '0') => {
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
              onAfterNodeMounted={debounceContianerScrollTo}
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
                  node-type="node"
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
              </DragContainer>
            </NodeContainer>
            {!node.noEdge && (
              <Edge
                nextNode={ parentNode.children ? parentNode.children[index + 1] :  null }
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
        onAfterNodeMounted={getLayoutRef}
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
          {renderNodeList(workFlow.workFlowNodes || {}, disabled)}
        </DropContainer>

        {
          workFlow.endNode && <div className="node-layout" id="end">
            {renderNodeList({
              children: [
                workFlow.endNode
              ]
            } as NodeConfig, true)}
          </div>
        }

        <Polyline style={rectStyle} />

      </DeleteContainer>
    );
  }

  return Palette
}
