import React, { useState, useEffect, useRef } from 'react';
import { NodeProps, NodeConfig } from '../types';

function WarnCircle() {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        background: 'red',
        position: 'absolute',
        top: -5,
        left: -5,
        borderRadius: '50%',
      }}
    ></div>
  );
}

export function NodeContainer({
  node,
  nodeLevelIndex,
  className,
  children,
  onAfterNodeMounted,
  dispatch,
  workFlow,
}: NodeProps) {
  const contianerRef = useRef<HTMLDivElement>(null);
  const [hoverClassName, setHoverClassName] = useState('');

  function setCurrentNode(node: NodeConfig, nodeLevelIndex: string) {
    dispatch({
      type: 'workFlow/setCurrentNode',
      payload: {
        node: { ...node, nodeLevelIndex },
      },
    });
  }
  function onNodeClick(evt: any, node: NodeConfig, nodeLevelIndex: string) {
    evt.stopPropagation();
    setCurrentNode(node, nodeLevelIndex);
  }

  useEffect(() => {
    if (contianerRef.current) {
      onAfterNodeMounted && onAfterNodeMounted(contianerRef?.current);
    }
    return () => {
      onAfterNodeMounted && onAfterNodeMounted();
    }
  }, [contianerRef]);

  function onMouseOver(evt: any) {
    evt.stopPropagation();
    setHoverClassName('mouse-hover');
  }

  function onMouseOut(evt: any) {
    evt.stopPropagation();
    evt.currentTarget.focus();
    setHoverClassName('');
    if (node.nodeId === workFlow.currentNode?.nodeId) {
      setCurrentNode(node, nodeLevelIndex);
    }
  }
  /* eslint-disable */
  return (
    <div
      ref={contianerRef}
      data-node-type={node.nodeType}
      data-node-children-types={
        node.childrenAbleTypes ? node.childrenAbleTypes.length : -1
      }
      data-node-id={node.nodeId}
      className={className + ' ' + hoverClassName}
      data-node-index={nodeLevelIndex}
      onClick={evt => onNodeClick(evt, node, nodeLevelIndex)}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {!node.configCompleteStatus && <WarnCircle />}
      {children}
    </div>
  );
}

export default React.memo(NodeContainer);
