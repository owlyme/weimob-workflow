import React, { useEffect, useState } from 'react';
import { FixedFooter } from 'saas-fe-kraken-core-react';
import { Form, Input, Select, Button, message } from 'antd';
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
    value: 'dubbo',
    label: 'dubbo',
  },
  {
    value: 'http',
    label: 'http',
  },
];
const methodList = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'POST',
    label: 'POST',
  },
];

function getCellSettings(node) {
  return node[CONFIG_KEY] || { cfg: { protocol: 'dubbo', cfg: {} } };
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

export default function ListenerForm({ node, dispatch, disabled = false }) {
  const [form] = Form.useForm();
  const [showBtns, setShowBtns] = useState(!node.weimobConfigSaved);

  const setNodeConfigStatus = (formData: object, status: boolean) => {
    const { protocol, desc, remark, ...others } = formData || {};
    const { nodeId, nodeType, nodeLevelIndex } = node;

    if (protocol === 'http') {
      others.method = others.methodHttp;
      delete others.methodHttp;
    }
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
        remark,
        cfg: { protocol, cfg },
      } = initData;

      const data = {
        desc,
        remark,
        protocol,
        ...cfg,
      };
      if (protocol === 'http') {
        data.methodHttp = data.method;
      }
      form.setFieldsValue(data);
    }
  }, [node, form]);

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
        <Item label="协议" name="protocol">
          <Select disabled={disabled}>
            {protocolList.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) =>
            prevValues.protocol !== curValues.protocol
          }
        >
          {({ getFieldValue }) => {
            const protocol = getFieldValue('protocol');
            return protocol === 'dubbo' ? (
              <>
                <Item
                  label="接口名"
                  name="interfaceName"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disabled} />
                </Item>
                <Item label="方法名" name="method" rules={[{ required: true }]}>
                  <Input disabled={disabled} />
                </Item>
                <Item label="版本" name="version" rules={[{ required: true }]}>
                  <Input disabled={disabled} />
                </Item>
                <Item label="组名" name="group">
                  <Input disabled={disabled} />
                </Item>
              </>
            ) : (
              <>
                <Item
                  label="Method"
                  name="methodHttp"
                  rules={[{ required: true }]}
                >
                  <Select disabled={disabled}>
                    {methodList.map(({ value, label }) => (
                      <Option key={value} value={value}>
                        {label}
                      </Option>
                    ))}
                  </Select>
                </Item>
                <Item label="Path" name="path" rules={[{ required: true }]}>
                  <Input disabled={disabled} />
                </Item>
              </>
            );
          }}
        </Form.Item>

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
  );
}
