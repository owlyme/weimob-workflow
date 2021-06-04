import React, { useEffect, useState } from 'react';
import { FixedFooter } from 'saas-fe-kraken-core-react';
import { Form, Input, Select, Button, message, Space } from 'antd';
import { CONFIG_KEY } from '../../constant';
import PreviewModal from './Editor';
import '../configStyle.less';
import { onFormChangeDebounce } from '../utils';

const Item = Form.Item;
const Option = Select.Option;
const defaultContent = `def execute(message) {
  
}`;
function getCellSettings(node) {
  return (
    node[CONFIG_KEY] || {
      cfg: {
        protocol: 'groovy',
        cfg: {
          content: defaultContent,
        },
      },
    }
  );
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export function verifyProcessorRequiredField(data) {
  if (!data.cfg) return false;
  const {
    protocol,
    cfg: { processorName, processorVersion },
  } = data.cfg;
  return protocol && processorName && processorVersion;
}

const protocolList = [
  {
    value: 'groovy',
    label: 'groovy',
  },
];

export default function TransformerConfig({
  node,
  dispatch,
  disabled = false,
}) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState(defaultContent);
  const [showBtns, setShowBtns] = useState(!node.weimobConfigSaved);

  const [form] = Form.useForm();

  const setNodeConfigStatus = (formData: object, status: boolean) => {
    const { protocol, desc, remark, ...others } = formData;
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
    onFormChangeDebounce(() => {
      setNodeConfigStatus(form.getFieldsValue(), false);
    });
  };
  const SumbitForm = formData => setNodeConfigStatus(formData, true);
  const submitFailed = () => {
    message.warning('提交失败，请完善表单');
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
      setContent(cfg.content);
    }
  }, [node, form]);

  const onOkModal = value => {
    setModalVisible(false);
    const formData = form.getFieldsValue();
    form.setFieldsValue({
      ...formData,
      content: value || defaultContent,
    });

    setContent(value);
    onValuesChange();
  };

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
          <Item label="协议" name="protocol" rules={[{ required: true }]}>
            <Select disabled={disabled}>
              {protocolList.map(({ value, label }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Item>

          <Item label="内容" name="content" rules={[{ required: true }]}>
            <Space align="baseline">
              <div style={{ width: '420' }}>
                <Input hidden disabled={disabled} />
                {content}
              </div>
              <Button
                disabled={disabled}
                type="primary"
                onClick={() => setModalVisible(!disabled)}
              >
                编辑
              </Button>
            </Space>
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

        <PreviewModal
          visible={modalVisible}
          initData={content}
          onOk={onOkModal}
          onClose={() => setModalVisible(false)}
        />
      </div>
    </>
  );
}
