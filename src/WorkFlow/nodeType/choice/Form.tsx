import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { FixedFooter } from 'saas-fe-kraken-core-react';
import { CONFIG_KEY } from '../../constant';
import { onFormChangeDebounce } from '../utils';
import '../configStyle.less';

const Item = Form.Item;
const Option = Select.Option;

const languageList = [
  {
    value: 'spel',
    label: 'spel',
  },
];

const typeList = [
  {
    value: 'when',
    label: 'when',
  },
  {
    value: 'default',
    label: 'default',
  },
];

export const isValidateConfig = config => {
  console.log(config);
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const submitFailed = () => {
  message.warning('提交失败，请完善表单');
};

function WhenForm({ node, dispatch, disabled = false }) {
  const [form] = Form.useForm();
  const [showBtns, setShowBtns] = useState(!node.weimobConfigSaved);

  const setNodeConfigStatus = (formData: object, status: boolean) => {
    const { nodeId, nodeType, nodeLevelIndex } = node;
    dispatch({
      type: 'workFlow/setConfigAndCompleteStatus',
      payload: {
        [CONFIG_KEY]: {
          nodeId,
          nodeType,
          ...formData,
        },
        nodeLevelIndex,
        nodeProperties: {
          configCompleteStatus: status,
        },
      },
      callback() {
        if (status) {
          message.success('配置完成！');
        } else if (!node.children?.length) {
          message.error('未配置子节点！');
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
  const SumbitForm = formData =>
    setNodeConfigStatus(formData, !!node.children?.length);

  useEffect(() => {
    form.resetFields();
    const initData = node[CONFIG_KEY] || {
      conditionType: 'when',
      language: 'spel',
      expression: '',
    };
    const { ...data } = initData;

    form.setFieldsValue({
      ...data,
    });
  }, [node, form]);

  return (
    <div className="form-config-container">
      <Form
        {...formItemLayout}
        form={form}
        onFinish={SumbitForm}
        onFinishFailed={submitFailed}
        onValuesChange={onValuesChange}
      >
        <Item label="Type" name="conditionType" rules={[{ required: true }]}>
          <Select disabled={true}>
            {typeList.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Item>

        <Item label="语言" name="language" rules={[{ required: true }]}>
          <Select disabled={disabled}>
            {languageList.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Item>

        <Item label="表达式" name="expression" rules={[{ required: true }]}>
          <Input.TextArea disabled={disabled} />
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

function DefaultForm({ node, dispatch, disabled = false }) {
  const [form] = Form.useForm();

  const SumbitForm = data => {
    const { nodeId, nodeType } = node;
    dispatch({
      type: 'workFlow/setCurrentNodeConfig',
      payload: {
        [CONFIG_KEY]: {
          nodeId,
          nodeType,
          ...data,
        },
      },
    });
  };

  useEffect(() => {
    form.resetFields();
    const initData = node[CONFIG_KEY] || {
      conditionType: 'default',
    };
    const { ...data } = initData;

    form.setFieldsValue({
      ...data,
    });
  }, [node, form]);

  return (
    <div className="form-config-container">
      <Form
        {...formItemLayout}
        form={form}
        onFinish={SumbitForm}
        onFinishFailed={submitFailed}
      >
        <Item label="Type" name="conditionType" rules={[{ required: true }]}>
          <Select disabled={true}>
            {typeList.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Item>
      </Form>
    </div>
  );
}

export default function ChoiceForm({ node, dispatch, disabled = false }) {
  const [form] = Form.useForm();
  const [showBtns, setShowBtns] = useState(!node.weimobConfigSaved);
  const setNodeConfigStatus = (formData: object, status: boolean) => {
    const { remark, desc, ...other } = formData;
    const { nodeId, nodeType, nodeLevelIndex } = node;
    dispatch({
      type: 'workFlow/setConfigAndCompleteStatus',
      payload: {
        [CONFIG_KEY]: {
          nodeId,
          nodeType,
          remark,
          desc,
          cfg: {
            conditions: other,
          },
        },
        nodeLevelIndex,
        nodeProperties: {
          weimobConfigSaved: status,
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
  const SumbitForm = formData => {
    setNodeConfigStatus(formData, true);
  };

  useEffect(() => {
    form.resetFields();
    const initData = node[CONFIG_KEY] || {
      desc: '',
      remark: '',
      cfg: {
        conditions: [],
      },
    };

    const {
      desc,
      remark,
      cfg: { conditions },
    } = initData;

    form.setFieldsValue({
      desc,
      remark,
      conditions,
    });
  }, [node, form]);

  return (
    <div className="form-config-container">
      <Form
        {...formItemLayout}
        form={form}
        onFinish={SumbitForm}
        onFinishFailed={submitFailed}
        onValuesChange={onValuesChange}
      >
        <Item label="描述" name="desc">
          <Input disabled={disabled} />
        </Item>
        <Item label="备注" name="remark">
          <Input.TextArea disabled={disabled} />
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

ChoiceForm.WhenForm = WhenForm;
ChoiceForm.DefaultForm = DefaultForm;
