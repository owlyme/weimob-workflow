/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { NodeProps } from '../types';
import Edge from '../edge';

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

export default function NodeContainer({
  node,
  parentNode,
  nodeLevelIndex,
  className,
  children,
  onAfterNodesChange,
  dispatch,
  workFlow,
  disabled,
}: NodeProps) {
  const [hoverClassName, setHoverClassName] = useState('');
  const contianerRef = useRef();

  function setCurrentNode(node, nodeLevelIndex) {
    dispatch({
      type: 'workFlow/setCurrentNode',
      payload: {
        node: { ...node, nodeLevelIndex },
      },
    });
  }
  function onNodeClick(evt, node, nodeLevelIndex) {
    evt.stopPropagation();
    setCurrentNode(node, nodeLevelIndex);
  }

  useEffect(() => {
    if (contianerRef.current) {
      onAfterNodesChange(node, contianerRef.current);
    }
  }, [contianerRef]);

  function onMouseOver(evt) {
    evt.stopPropagation();
    setHoverClassName('mouse-hover');
  }

  function onMouseOut(evt) {
    evt.stopPropagation();
    evt.currentTarget.focus();
    setHoverClassName('');
    if (node.nodeId === workFlow.currentNode?.nodeId) {
      setCurrentNode(node, nodeLevelIndex);
    }
  }

  function stopAndPrevent(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function onDragEnter(evt) {
    stopAndPrevent(evt);
  }

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
