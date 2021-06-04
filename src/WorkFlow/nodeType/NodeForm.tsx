import React from 'react';
import { Tabs, Empty } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { NodeTypeForms } from './index';

const { TabPane } = Tabs;

function UndefinedNode() {
  return <Empty description={false}>请选中一个流程节点进行编辑</Empty>;
}

function getNodeTypeComp(nodeType:string) {
  return NodeTypeForms[nodeType] ? NodeTypeForms[nodeType] : UndefinedNode;
}

export default function NodeForm({ disabled = false, workFlow:any, dispatch }) {
  const node = workFlow.currentNode;
  const NodeForm = getNodeTypeComp(node.nodeType);
  return (
    <div>
      <Tabs defaultActiveKey="setting">
        <TabPane
          tab={
            <span>
              <SettingOutlined />
              配置
            </span>
          }
          key="setting"
        >
          <NodeForm node={node} dispatch={dispatch} disabled={disabled} />
        </TabPane>
      </Tabs>
    </div>
  );
}
