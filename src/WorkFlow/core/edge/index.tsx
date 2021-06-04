import React, { useState, useRef } from 'react';
import Arrow from '../arrow';
import { NodeProps } from '../types';
import IconCom from '../images/icons';
import { mouseIsInDragEnterElementArea } from '../utils';

function stopAndPrevent(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}
const toggoleClassName = (className = '') => `node-edge ${className}`;

export default function Edge({
  node,
  nodeLevelIndex,
  dispatch,
  parentNode,
  workFlow,
  disabled,
}: NodeProps) {
  const container = useRef();
  const { dragNodeData } = workFlow;
  const [className, setClassName] = useState(toggoleClassName());
  const [visible, setVisible] = useState(false);

  const ondragover = evt => {
    stopAndPrevent(evt);
  };

  const onDrop = evt => {
    stopAndPrevent(evt);
    const dragData = dragNodeData;
    if (!dragData.node || dragData.nodeLevelIndex === nodeLevelIndex) return;
    dispatch({
      type: 'workFlow/onDragSortEnd',
      payload: {
        dragNode: dragData.node,
        dragNodeLevelIndex: dragData.nodeLevelIndex,
        edgeNode: node,
        edgeNodeLevelIndex: nodeLevelIndex,
        isSameParnet: dragData.parentNodeId === parentNode.nodeId,
      },
    });
    setClassName(toggoleClassName());
    setVisible(false);
  };

  function onDragEnter(evt) {
    stopAndPrevent(evt);
    // 当移动节点为自身时不操作
    if (workFlow.dragNodeData.node.nodeId === node.nodeId) return;

    setClassName(toggoleClassName('drag-enter'));
    setVisible(true);
  }

  function onDragLeave(evt) {
    stopAndPrevent(evt);
    if (
      !mouseIsInDragEnterElementArea(
        container.current.getBoundingClientRect(),
        evt,
      )
    ) {
      console.log('onDragLeave');
      setClassName(toggoleClassName());
      setVisible(false);
    }
  }

  if (container.current) {
    const { current } = container;
    current.ondragenter = onDragEnter;
    current.ondragleave = onDragLeave;
    current.ondragover = ondragover;
    current.ondrop = onDrop;
  }

  return (
    <div ref={container} className={className} data-edge-index={nodeLevelIndex}>
      <div className="center-area">
        <Arrow />
        {!disabled && visible && (
          <IconCom type={workFlow.dragNodeData?.node?.icon} />
        )}
      </div>
    </div>
  );
}
