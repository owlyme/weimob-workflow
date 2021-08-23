import React, { useEffect} from 'react';
import { NodeProps } from '../../core/types';
import DropNode from "./DropNode"

// 必须有一个子节点
export default function ChildNode(props: NodeProps) {
  const {
    node,
    nodeLevelIndex,
    dispatch
  } = props;

  useEffect(() => {
    dispatch({
      type: 'workFlow/setNodePorpertiesAndValues',
      payload: {
        nodeLevelIndex,
        configCompleteStatus: node.children && node.children.length,
      },
    });
  }, [node?.children?.length, nodeLevelIndex, dispatch]);

  return <DropNode 
    {...props}
    disabled={true}>
    </DropNode>
}
