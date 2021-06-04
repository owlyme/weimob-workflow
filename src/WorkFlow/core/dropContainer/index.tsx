import React, { useRef } from 'react';
import { mouseIsInDragEnterElementArea } from '../utils';

export default function DropContainer({
  node,
  children,
  dispatch,
  workFlow,
  nodeLevelIndex,
  onContainerDragEnter = f => f,
  onContainerDragLeave = f => f,
  ...props
}:any) {
  const container = useRef();

  function onDragEnter(evt) {
    const children = workFlow.dragNodeData.node.children;
    // 当移动节点为当前节点的父级时不操作
    if (children && children.find(child => child.nodeId === node.nodeId)) {
      container.current.ondragover = null;
      return;
    }

    container.current.ondragover = onDragOver;
    onContainerDragEnter(true);
  }

  function onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (workFlow.dragNodeData.node && container.current.ondragover) {
      if (!workFlow.dragNodeData.node.nodeId) {
        dispatch({
          type: 'workFlow/onAddNodeDragEnd',
          payload: {
            dragNode: workFlow.dragNodeData.node,
            dragEnterNode: { ...node, nodeLevelIndex },
          },
        });
      } else {
        // 当移动节点为当前节点的父级时不操作
        const children = workFlow.dragNodeData.node.children;
        if (children && children.find(child => child.nodeId === node.nodeId))
          return;

        dispatch({
          type: 'workFlow/onMoveNode',
          payload: {
            dragNode: workFlow.dragNodeData.node,
            dragNodeLevelIndex: workFlow.dragNodeData.nodeLevelIndex,
            targetNode: { ...node, nodeLevelIndex },
          },
        });
      }
    }
    onContainerDragLeave(false);
  }

  function onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    container.current.ondragover = null;
    if (
      !mouseIsInDragEnterElementArea(
        container.current.getBoundingClientRect(),
        evt,
      )
    ) {
      onContainerDragLeave(false);
    }
  }

  const onDragOver = evt => {
    evt.stopPropagation();
    evt.preventDefault();
  };

  if (container.current) {
    const { current } = container;
    current.ondragenter = onDragEnter;
    current.ondragleave = onDragLeave;
    current.ondragover = onDragOver;
    current.ondrop = onDrop;
  }

  return (
    <div data-name="drop-container" ref={container} {...props}>
      {children}
    </div>
  );
}
