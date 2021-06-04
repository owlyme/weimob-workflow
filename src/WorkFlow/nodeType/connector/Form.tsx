import React, { useEffect, useState } from 'react';
import { FixedFooter } from 'saas-fe-kraken-core-react';
import { Form, Input, Select, Button, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CONFIG_KEY } from '../../constant';
import { onFormChangeDebounce } from '../utils';

import '../configStyle.less';

const Item = Form.Item;
const Option = Select.Option;

export const isValidateConfig = config => {
  console.log(config);
};

const protocolList = [
  {
    value: 'http',
    label: 'http',
  },
  {
    value: 'dubbo',
    label: 'dubbo',
  },
];

function getCellSettings(node) {
  return (
    node[CONFIG_KEY] || { cfg: { protocol: 'http', cfg: { method: 'POST' } } }
  );
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

export function verifyListenerRequiredField(data) {
  if (!data.cfg) return false;
  const {
    protocol,
    cfg: { interfaceName, method, version },
  } = data.cfg;
  return protocol && interfaceName && method && version;
}

const RenderMethodForm: React.FC = ({ disabled }) => (
  <Form.List
    name="header"
    initialValue={[
      {
        key: 'Content-Type',
        value: 'application/json;charset=UTF-8',
      },
    ]}
  >
    {(fields, { add, remove }) => (
      <>
        {fields.map(field => (
          <Space align="baseline" key={field.key}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, curValues) =>
                prevValues.area !== curValues.area ||
                prevValues.sights !== curValues.sights
              }
            >
              {() => (
                <Form.Item
                  {...field}
                  name={[field.name, 'key']}
                  fieldKey={[field.fieldKey, 'key']}
                  // rules={[{ required: true, message: 'key缺失' }]}
                >
                  <Input placeholder="KEY" disabled={disabled} />
                </Form.Item>
              )}
            </Form.Item>
            <Form.Item
              {...field}
              name={[field.name, 'value']}
              fieldKey={[field.fieldKey, 'value']}
              // rules={[{ required: true, message: 'Missing price' }]}
            >
              <Input placeholder="VALUE" disabled={disabled} />
            </Form.Item>
            {!disabled && (
              <MinusCircleOutlined
                disabled={disabled}
                onClick={() => remove(field.name)}
              />
            )}
          </Space>
        ))}
        {!disabled && (
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              添加一行数据
            </Button>
          </Form.Item>
        )}
      </>
    )}
  </Form.List>
);

interface RenderProtocolProps {
  protocol: string;
  disabled: boolean;
}

const RenderByProtocol: React.FC<RenderProtocolProps> = (props: any) => {
  const { protocol, disabled } = props;
  if (protocol === 'http') {
    return (
      <>
        <Item label="访问URL" name="uri" rules={[{ required: true }]}>
          <Input disabled={disabled} />
        </Item>
        <Item label="请求类型" name="method" rules={[{ required: true }]}>
          <Select disabled={disabled}>
            {['GET', 'POST', 'PATCH', 'DELETE'].map(item => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="请求头" name="header">
          <RenderMethodForm disabled={disabled}></RenderMethodForm>
        </Item>
        <Item label="请求体" name="body">
          <Input.TextArea disabled={disabled} />
        </Item>
        <Item label="请求参数" name="params">
          <Input disabled={disabled} />
        </Item>
      </>
    );
  } else {
    return (
      <>
        <Item label="接口名" name="interfaceName" rules={[{ required: true }]}>
          <Input disabled={disabled} />
        </Item>
        <Item label="method" name="method" rules={[{ required: true }]}>
          <Input disabled={disabled} />
        </Item>
        {/* <Item label="参数类型" name="type">
          <Input disabled={disabled} />
        </Item> */}
        <Item label="请求体" name="body">
          {/* <Input.TextArea disabled={disabled} /> */}
          <Form.List name="body">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      fieldKey={[fieldKey, 'key']}
                    >
                      {/* <Input placeholder="paramType" disabled={disabled} /> */}
                      <Input.TextArea
                        placeholder="paramType"
                        disabled={disabled}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      fieldKey={[fieldKey, 'value']}
                    >
                      <Input.TextArea
                        placeholder="paramValue"
                        disabled={disabled}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加一行数据
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Item>
        <Item label="分组" name="group">
          <Input disabled={disabled} />
        </Item>
        <Item label="版本" name="version">
          <Input disabled={disabled} />
        </Item>
      </>
    );
  }
};

export default function ConnectorForm({ node, dispatch, disabled = false }) {
  const [form] = Form.useForm();
  const [currentProtocol, setCurrentProtocol] = useState('http');
  const [showBtns, setShowBtns] = useState(!node.weimobConfigSaved);

  const setNodeConfigStatus = (formData: object, status: boolean) => {
    const { nodeId, nodeType, nodeLevelIndex } = node;
    const { protocol, desc, remark, ...others } = formData;
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
              language: 'spel',
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
      setCurrentProtocol(protocol);
    }
  }, [node, form]);

  const onProtocolSelect = (value: string) => {
    setCurrentProtocol(value);
  };

  return (
    <div className="form-config-container">
      <Form
        size="small"
        {...formItemLayout}
        form={form}
        onFinish={SumbitForm}
        onFinishFailed={submitFailed}
        onValuesChange={onValuesChange}
      >
        <Item label="协议" name="protocol" rules={[{ required: true }]}>
          <Select disabled={disabled} onSelect={onProtocolSelect}>
            {protocolList.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Item>
        <RenderByProtocol
          protocol={currentProtocol}
          disabled={disabled}
        ></RenderByProtocol>
        <Item label="描述" name="desc">
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
  );
}
