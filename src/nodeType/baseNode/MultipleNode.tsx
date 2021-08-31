import React, { useEffect } from 'react';
import { NodeProps } from '../../core/types';
import DropNode  from "./DropNode"

// 可以创建同组容器节点
export default function MultipleNode(props: NodeProps) {
  const {
    node,
    nodeLevelIndex,
    dispatch,
    parentNode,
    disabled,
  } = props;

  const deleteForbidden = parentNode && parentNode?.children && parentNode.children?.length <= node.minChildNum;

  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodePorpertiesAndValues',
      payload: {
        nodeLevelIndex,
        configCompleteStatus: node.weimobConfigSaved && node.children && node.children.length,
        deleteForbidden
      },
    });
  }, [node?.children?.length, nodeLevelIndex, deleteForbidden, dispatch]);

  const addChildren = (evt: MouseEvent) => {
    evt.stopPropagation();

    const { label, nodeType, childrenFlex, draggable, showIndex, startIndex, childrenKey } = node

    dispatch({
      type: 'workFlow/insertBrotherNode',
      payload: {
        node: {
            label,
            nodeType,
            draggable,
            noEdge: true,
            childrenFlex,
            deleteForbidden: false,
            showIndex,
            startIndex,
            childrenKey,
            children: [],
        },
        nodeLevelIndex,
      },
    });
  };

  return (
    <DropNode 
    {...props}
    disabled={deleteForbidden && !disabled}
    showIndex={node.showIndex}
    startIndex={node.startIndex}
    onAddChildren={addChildren}>
    </DropNode>
  );
}


