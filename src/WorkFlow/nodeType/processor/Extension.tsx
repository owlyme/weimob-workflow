import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Drawer, Tabs, Collapse, Empty, Space } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { CONFIG_KEY } from '../../constant';

const { TabPane } = Tabs;
const { Panel } = Collapse;

function getCellSettings(node) {
  return node[CONFIG_KEY] || { cfg: { protocol: 'bean', desc: '', cfg: {} } };
}

const ProcessorExtension: React.FC = ({ node }) => {
  const dispatch = useCallback(useDispatch(), []);
  const {
    bpmnDesigner: { componentId, extensionInfo },
  } = useSelector<DefaultRootState, DefaultRootState>(state => state);

  const [initData] = useState(() => {
    const formatNode = getCellSettings(node);
    return formatNode;
  });

  const [visible, setVisible] = useState(false);
  const showDrawer = useCallback(() => {
    const {
      cfg: { cfg },
    } = initData;
    componentId &&
      dispatch({
        type: 'bpmnDesigner/getProcessorExtensionList',
        params: {
          componentId: componentId,
          processorVersion: cfg.processorVersion,
          processorName: cfg.processorName,
        },
      });
    setVisible(true);
  }, [dispatch, initData, componentId]);
  const onClose = () => {
    setVisible(false);
  };

  const callback = key => {
    console.log(key);
  };

  return (
    <>
      <Space onClick={showDrawer}>
        <span className="node-name">扩展点：</span>
        <EllipsisOutlined
          className="xy"
          style={{ color: '#1890ff', fontSize: 20, fontWeight: 700 }}
        />
      </Space>
      <Drawer
        title="扩展点预览"
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {extensionInfo && extensionInfo.length ? (
          <Tabs defaultActiveKey="1" onChange={callback}>
            {extensionInfo.map(item => {
              return (
                <TabPane tab={item.description} key={item.appId}>
                  <Collapse
                    defaultActiveKey={[item.children?.[0].className]}
                    onChange={callback}
                  >
                    {item.children.map(v => {
                      return (
                        <Panel
                          header={`${v.tcode}:${v.productCode}:${v.scene}:${v.bizType}`}
                          key={v.className}
                        >
                          {/* <p>协议：{v.appId}</p> */}
                          <p>名称：{v.className}</p>
                          <p>描述：{v.description}</p>
                          <p>负责人：{v.owner}</p>
                        </Panel>
                      );
                    })}
                  </Collapse>
                </TabPane>
              );
            })}
          </Tabs>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无扩展点"
          />
        )}
      </Drawer>
    </>
  );
};

export default ProcessorExtension;
