import React, { useEffect, useState } from 'react';
import { FixedFooter } from 'saas-fe-kraken-core-react';
import { Form, Input, Button, message } from 'antd';
import { CONFIG_KEY } from '../../constant';
import { onFormChangeDebounce } from '../utils';
import '../configStyle.less';

const Item = Form.Item;
export const isValidateConfig = config => {
  console.log(config);
};

function getCellSettings(node) {
  return node[CONFIG_KEY] || { desc: '', remark: '', cfg: { parallel: [] } };
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export function verifyListenerRequiredField(data) {
  if (!data.cfg) return false;
  const {
    protocol,
    cfg: { interfaceName, method, version },
  } = data.cfg;
  return protocol && interfaceName && method && version;
}

export default function ParallelConfig({ node, dispatch, disabled = false }) {
  const [form] = Form.useForm();
  const [showBtns, setShowBtns] = useState(!node.weimobConfigSaved);

  const setNodeConfigStatus = (formData: object, status: boolean) => {
    const { desc, remark } = formData;
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
            parallel: [],
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
      const { desc, remark } = initData;

      form.setFieldsValue({
        desc,
        remark,
      });
    }
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
