import React from 'react';
import { NodeProps } from '../types';
import { setDragImage } from '../utils';

export default function DragContainer({
  node,
  nodeLevelIndex,
  parentNode,
  dispatch,
  children,
}: NodeProps) {
  const onDragStart = (evt: any) => {
    evt.stopPropagation();
    if (!node.draggable) {
      evt.preventDefault();
      return;
    }
    setDragImage(evt, evt.target.querySelector('svg'));

    dispatch({
      type: 'workFlow/saveDragingNodeData',
      payload: {
        node,
        nodeLevelIndex,
        parentNodeId: parentNode?.nodeId,
      },
    });
  };

  const onDragEnd = () => {
    // evt.stopPropagation();
    // if (workFlow.dragEnterNode && workFlow.dragNodeData.node) {
    //   dispatch({
    //     type: 'workFlow/onMoveNode',
    //     payload: {
    //       dragNode: workFlow.dragNodeData.node,
    //       dragNodeLevelIndex: workFlow.dragNodeData.nodeLevelIndex,
    //       targetNode: workFlow.dragEnterNode
    //     },
    //   });
    // }
  };

  return (
    <div
      draggable={node.draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  );
}
