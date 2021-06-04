import React, { useState } from 'react';
import { Collapse, message, Input } from 'antd';
import toolList from './toolList';
import { IconCom, setDragImage, childDisable } from '../core';
import './style.less';

const { Panel } = Collapse;
const { Search } = Input;

const Toolbar = ({ disabled = false, workFlow, dispatch }:any) => {
  const { currentNode } = workFlow;
  const [shapeList, setShapeList] = useState(toolList);

  const onClick = (node:any) => {
    if (disabled) {
      message.error('当前流程不可修改流程，请复制！');
      return;
    }

    let type = 'workFlow/insertNodeToTargetNode';

    if (currentNode && currentNode.nodeId) {
      if (childDisable(currentNode.childrenAbleTypes, node.nodeType)) {
        dispatch({
          type: 'workFlow/insertBrotherNode',
          payload: {
            node,
            nodeLevelIndex: currentNode.nodeLevelIndex,
            order: 1,
          },
        });

        return;
      }
      if (currentNode.nodeType === 'placeholder') {
        type = 'workFlow/replacePlaceholderNode';
      }
    }

    dispatch({
      type,
      payload: {
        node,
        targetNode: currentNode,
      },
    });
  };

  const onDragStart = (evt:any, node:any) => {
    evt.stopPropagation();
    setDragImage(evt, evt.target.querySelector('svg'));

    dispatch({
      type: 'workFlow/saveDragingNodeData',
      payload: {
        node,
      },
    });
  };

  const onDragEnd = (evt:any) => {
    evt.stopPropagation();
  };

  const onChange = (e: any) => {
    e.persist();
    const shapeList = toolList.filter(item =>
      item.label?.includes(e.target.value),
    );
    setShapeList(shapeList);
  };

  return (
    <div className="toolbarContainer">
      <Search
        placeholder="搜索节点"
        allowClear
        onChange={onChange}
        style={{ width: '100%', padding: '10px' }}
      />
      <Collapse
        bordered={false}
        className="ge-collapse-custom-collapse"
        defaultActiveKey={['common', 'svg', 'picture', 'card']}
      >
        <Panel
          key="common"
          header="逻辑组件"
          className="ge-collapse-custom-panel"
        >
          {shapeList.map(shape => (
            <div
              draggable={true}
              key={`panel_a_${shape.label}`}
              className="geItem custom-sidebar-node common-panel-node"
              onClick={() => onClick(shape)}
              onDragStart={evt => onDragStart(evt, shape)}
              onDragEnd={evt => onDragEnd(evt)}
            >
              <IconCom
                className="sidebar-node-icon"
                type={shape.icon}
                alt={shape.label}
                color="#1890ff"
              />
              <span className="sidebar-node-label">{shape.label}</span>
            </div>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Toolbar;
