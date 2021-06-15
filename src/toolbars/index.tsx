import React, { useState, useCallback, useMemo } from 'react';
import { Collapse, message, Input } from 'antd';
import { useSelector, useDispatch } from 'dva';
import commonList, { processorNodeConfig } from './toolList';
import IconCom from '../images/icons';
import { setDragImage, childDisable } from '../utils';
import { CONFIG_KEY } from '../constant';
import './style.less';

const { Panel } = Collapse;
const { Search } = Input;

const formatToolList = (toolList, config) =>
  (toolList || []).map(tool => {
    tool.items = tool.items.map(item => ({
      ...config,
      weimobConfigSaved: true,
      configCompleteStatus: true, // 是否显示左上角红点提示
      [CONFIG_KEY]: item.nodeConfig,
      id: item.id,
      label: item.name,
      weimobConfigDisable: true,
    }));
    return tool;
  });

export const Toolbar = ({ disabled = false, toolList = {} }) => {
  const dispatch = useCallback(useDispatch(), []);
  const {
    bpmnDesigner,
    workFlow: { currentNode },
  } = useSelector<DefaultRootState, DefaultRootState>(state => state);

  const [shapeList, setShapeList] = useState(null);
  const formatList = useMemo(() => {
    const processors = formatToolList(toolList.processors, processorNodeConfig);
    const list = [
      {
        id: 'common',
        name: '通用节点',
        items: commonList,
      },
      ...processors,
    ];
    return list;
  }, [toolList]);

  const onClick = node => {
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

  const onChange = (e: any) => {
    e.persist();
    let list = null;
    const keyword = e.target.value;
    if (keyword.trim()) {
      list = [...formatList].map(tool => {
        const lowerCaseKeyword = keyword.toLocaleLowerCase();
        return {
          ...tool,
          items: tool.items.filter(item =>
            (item.label || '').toLocaleLowerCase().includes(lowerCaseKeyword),
          ),
        };
      });
    } else {
      list = null;
    }
    setShapeList(list);
  };

  const onDragStart = (evt, node) => {
    evt.stopPropagation();
    setDragImage(evt, evt.target.querySelector('svg'));

    dispatch({
      type: 'workFlow/saveDragingNodeData',
      payload: {
        node,
      },
    });
  };

  const onDragEnd = evt => {
    evt.stopPropagation();
  };

  const draggable = bpmnDesigner.processInfo.workFlowStatus == 0;

  const toolGroup = tool => {
    return (
      (tool.items || []).length && (
        <Panel
          key={tool.id}
          header={tool.name}
          className="ge-collapse-custom-panel"
        >
          {(tool.items || []).map(shape => (
            <div
              key={`panel_a_${shape.id || shape.label}`}
              className="geItem custom-sidebar-node common-panel-node"
              onClick={() => onClick(shape)}
              onDragStart={evt => onDragStart(evt, shape)}
              onDragEnd={evt => onDragEnd(evt, shape)}
              draggable={draggable}
              title={shape.label}
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
      )
    );
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
        {(shapeList || formatList).map(tool => toolGroup(tool))}
      </Collapse>
    </div>
  );
};
