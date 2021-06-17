import React, { useRef } from 'react';
import { NodeConfig } from '../types';
import { mouseIsInDragEnterElementArea } from '../utils';

export default function DropContainer({
  node,
  children,
  dispatch,
  workFlow,
  nodeLevelIndex,
  onContainerDragEnter,
  onContainerDragLeave,
  ...props
}: any) {
  const container: React.RefObject<any> = useRef({});

  function onDragEnter(): void {

    const children = workFlow.dragNodeData.node?.children;
    // 当移动节点为当前节点的父级时不操作
    if (
      container.current &&
      children &&
      children.find((child: NodeConfig) => child.nodeId === node.nodeId)
    ) {
      container.current.ondragover = null;
      return;
    }

    container.current.ondragover = onDragOver;
    onContainerDragEnter && onContainerDragEnter(true);
  }

  function onDrop(evt: any) {
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
        console.log(workFlow.dragNodeData, nodeLevelIndex)
        if (nodeLevelIndex.indexOf(workFlow.dragNodeData.nodeLevelIndex) === 0) return;

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
    onContainerDragLeave && onContainerDragLeave(false);
  }

  function onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    container.current.ondragover = null;
    if (
      !mouseIsInDragEnterElementArea(
        container.current.getBoundingClientRect(),
        evt,
      )
    ) {
      onContainerDragLeave && onContainerDragLeave(false);
    }
  }

  const onDragOver = (evt: any) => {
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
