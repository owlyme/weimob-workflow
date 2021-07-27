import React, { useState, useRef } from 'react';
import Arrow from '../arrow';
import { NodeProps } from '../types';
import IconCom from '../images/icons';
import { mouseIsInDragEnterElementArea } from '../utils';
import { NODE_TYPE_ASYNC } from "../../constant"

function stopAndPrevent(evt: any) {
  evt.stopPropagation();
  evt.preventDefault();
}
const toggoleClassName = (className = '') => `node-edge ${className}`;

export default function Edge({
  nextNode,
  node,
  nodeLevelIndex,
  dispatch,
  parentNode,
  workFlow,
  disabled,
}: NodeProps) {

  const container = useRef<HTMLDivElement>(null);
  const { dragNodeData } = workFlow;
  const [className, setClassName] = useState(toggoleClassName());
  const [visible, setVisible] = useState(false);

  const ondragover = (evt: any) => {
    stopAndPrevent(evt);
  };

  const onDrop = (evt: any) => {
    stopAndPrevent(evt);
    const dragData = dragNodeData;
    if (!dragData.node || nodeLevelIndex.indexOf(dragData.nodeLevelIndex) === 0) return;
    dispatch({
      type: 'workFlow/onDragSortEnd',
      payload: {
        dragNode: dragData.node,
        dragNodeLevelIndex: dragData.nodeLevelIndex,
        edgeNode: node,
        edgeNodeLevelIndex: nodeLevelIndex,
        isSameParnet: dragData.parentNodeId === parentNode?.nodeId,
      },
    });
    setClassName(toggoleClassName());
    setVisible(false);
  };

  function onDragEnter(evt: any) {
    stopAndPrevent(evt);
    // 当移动节点为自身时不操作
    if (workFlow.dragNodeData.node.nodeId === node.nodeId) return;

    setClassName(toggoleClassName('drag-enter'));
    setVisible(true);
  }

  function onDragLeave(evt: any) {
    stopAndPrevent(evt);
    if (
      !mouseIsInDragEnterElementArea(
        container?.current?.getBoundingClientRect(),
        evt,
      )
    ) {
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
        <Arrow dashed={node.nodeType == NODE_TYPE_ASYNC || nextNode?.nodeType === NODE_TYPE_ASYNC} />
        {!disabled && visible && (
          <IconCom type={workFlow.dragNodeData?.node?.icon} />
        )}
      </div>
    </div>
  );
}
