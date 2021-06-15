import React from 'react';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {  NodeConfig } from '../types';

export default function NodeActionsColse({
  node,
  nodeLevelIndex,
  dispatch,
}: any) {
  function onRemoveNode(evt: any, node: NodeConfig, nodeLevelIndex: string) {
    evt.stopPropagation();
    Modal.confirm({
      content: '您确定删除当前节点？',
      onOk() {
        dispatch({
          type: 'workFlow/removeNode',
          payload: {
            node,
            nodeLevelIndex,
          },
        });
      },
    });
  }

  return (
    <CloseOutlined
      style={{ fontSize: 14 }}
      onClick={evt => {
        onRemoveNode(evt, node, nodeLevelIndex);
      }}
    />
  );
}
