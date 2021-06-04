import React, { useEffect, useState, useCallback } from 'react';
import { FixedFooter } from 'saas-fe-kraken-core-react';
import { useSelector, useDispatch } from 'dva';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Table,
  Row,
  Col,
  message,
} from 'antd';
import { CONFIG_KEY } from '../../constant';
import { onFormChangeDebounce } from '../utils';
import '../configStyle.less';

const Item = Form.Item;
const Option = Select.Option;

function getCellSettings(node) {
  return node[CONFIG_KEY] || { cfg: { protocol: 'bean', desc: '', cfg: {} } };
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const formItemLayout1 = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const ProcessorTable = ({ processorName, onSelected = f => f }) => {
  const dispatch = useCallback(useDispatch(), []);
  const { bpmnDesigner } = useSelector<DefaultRootState, DefaultRootState>(
    state => state,
  );

  const columns = [
    {
      title: '名称',
      dataIndex: 'processorName',
    },
    {
      title: '版本号',
      dataIndex: 'processorVersion',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      render: (record, index) => {
        return (
          <Button
            type="link"
            onClick={() => {
              onSelected(record);
            }}
          >
            导入
          </Button>
        );
      },
    },
  ];

  const [list, setList] = useState([]);
  const [pageInfo, setPageInfo] = useState({ current: 1, size: 10 });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const getTableData = useCallback(
    pageInfo => {
      const { current, size } = pageInfo;
      if (!bpmnDesigner.componentId) return;
      dispatch({
        type: 'bpmnDesigner/getProcessorList',
        params: {
          componentId: bpmnDesigner.componentId,
          current,
          size,
        },
        callback: ({ records, ...others }) => {
          setList(records.map((i, index) => ({ ...i, index })));
          setPageInfo(others);

          setSelectedIndex(null);
          records.find((item, index) => {
            if (item.processorName === processorName) {
              setSelectedIndex(index);
            }
            return item.processorName === processorName;
          });
        },
      });
    },
    [bpmnDesigner.componentId, setPageInfo, dispatch, setList, processorName],
  );
  const { size, current } = pageInfo;
  useEffect(() => {
    getTableData({ size: size, current: current });
  }, [getTableData, size, current]);

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={list}
      rowKey={row => row.index}
      pagination={{
        current: pageInfo.current,
        pageSize: pageInfo.size,
        total: pageInfo.total,
        size: 'small',
        onChange: page => {
          setPageInfo({
            ...pageInfo,
            current: page,
          });
          getTableData();
        },
      }}
      rowClassName={(record, index) => {
        if (index === selectedIndex) return 'ant-table-row-selected';
      }}
    />
  );
};

export default function ProcessorConfig({ node, dispatch, disabled = false }) {
  const [protocolList] = useState([
    {
      value: 'bean',
      label: 'bean',
    },
  ]);
  const [processorName, setProcessorName] = useState('');
  const [protocol, setProtocol] = useState();
  const [visibleTable, setVisibleTable] = useState();
  const [form] = Form.useForm();
  const [showBtns, setShowBtns] = useState(!node.weimobConfigSaved);

  const setNodeConfigStatus = (formData: object, status: boolean) => {
    const { protocol, desc, remark, ...others } = formData || {};
    const { nodeId, nodeType, nodeLevelIndex } = node;
    dispatch({
      type: 'workFlow/setConfigAndCompleteStatus',
      payload: {
        [CONFIG_KEY]: {
          nodeType,
          nodeId,
          desc,
          remark,
          cfg: {
            protocol,
            cfg: {
              ...others,
            },
          },
        },
        nodeLevelIndex,
        nodeProperties: {
          weimobConfigSaved: status,
          configCompleteStatus: status,
        },
      },
      callback() {
        if (status) {
          message.success('配置完成！');
        }
        setShowBtns(!status);
      },
    });
  };
  const onValuesChange = () => {
    // changedValues, allValues
    onFormChangeDebounce(() => {
      setNodeConfigStatus(form.getFieldsValue(), false);
    });
  };

  const SumbitForm = formData => setNodeConfigStatus(formData, true);

  const submitFailed = () => {
    message.warning('提交失败，请完善表单');
  };

  function onSelectionChange(protocol) {
    setProtocol(protocol);
  }

  const onProcessorSelected = ({
    processorVersion,
    description,
    processorName,
  }) => {
    onProcessorSelected.info = {
      processorVersion,
      desc: description,
      processorName,
    };
    onConfirmSelect();
    dispatch({
      type: 'bpmnDesigner/setProcessorInfo',
      payload: onProcessorSelected.info,
    });
  };

  const onConfirmSelect = () => {
    const formData = form.getFieldsValue();
    form.setFieldsValue({
      ...formData,
      ...onProcessorSelected.info,
    });

    setVisibleTable(false);
    onValuesChange();
    setProcessorName(onProcessorSelected.info?.processorName || '');
  };

  useEffect(() => {
    form.resetFields();
    if (node) {
      const initData = getCellSettings(node);
      const {
        desc,
        cfg: { protocol, cfg },
      } = initData;

      form.setFieldsValue({
        desc,
        protocol,
        ...cfg,
      });

      setProtocol(protocol);
      setProcessorName(cfg.processorName);
    }
  }, [node, form]);
  const isBean = protocol === 'bean';

  return (
    <>
      <div className="form-config-container">
        <Form
          {...formItemLayout}
          form={form}
          onFinish={SumbitForm}
          onFinishFailed={submitFailed}
          onValuesChange={onValuesChange}
        >
          <Row>
            <Col span="19">
              <Item
                style={{ flex: '1' }}
                {...formItemLayout1}
                label="协议"
                name="protocol"
                rules={[{ required: true }]}
              >
                <Select onChange={onSelectionChange} disabled={disabled}>
                  {protocolList.map(({ value, label }) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col span="4">
              <Button
                disabled={disabled || !isBean}
                onClick={() => setVisibleTable(true)}
                type="primary"
              >
                导入
              </Button>
            </Col>
          </Row>

          <Item
            label="处理程序"
            name="processorName"
            rules={[{ required: true }]}
          >
            <Input disabled={disabled || isBean} />
          </Item>
          <Item
            label="版本"
            name="processorVersion"
            rules={[{ required: true }]}
          >
            <Input disabled={disabled || isBean} />
          </Item>
          <Item label="描述" name="desc">
            <Input disabled={disabled} />
          </Item>
          <Item label="备注" name="remark">
            <Input disabled={disabled} />
          </Item>

          {!disabled && showBtns && (
            <FixedFooter
              getContainer=".form-config-container"
              className="form-config-btns"
            >
              <>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>
                <Button className="m-l-sm">取消</Button>
              </>
            </FixedFooter>
          )}
        </Form>
      </div>

      <Modal
        style={{ top: 20, right: 0 }}
        title="选择处理程序"
        visible={visibleTable}
        onOk={onConfirmSelect}
        onCancel={() => setVisibleTable(false)}
        footer={null}
      >
        <ProcessorTable
          onSelected={onProcessorSelected}
          processorName={processorName}
        />
      </Modal>
    </>
  );
}
