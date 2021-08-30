import React from 'react';
import { NodeProps } from '../types';
import { setDragImage } from '../utils';

// 拖动相关操作
// 将拖动的保存到store，以便托动结束时使用该节点配置

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
