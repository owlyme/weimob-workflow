import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, Row, Col, message } from 'antd';
import { FixedFooter } from 'saas-fe-kraken-core-react';
import { CONFIG_KEY } from '../../constant';
import { getExceptionClass, addExceptionClass } from '../../../services/api';
import { onFormChangeDebounce, debounce } from '../utils';
import '../configStyle.less';

const Item = Form.Item;
const Option = Select.Option;
const debounceGetExceptionClass = debounce((val, callback) => {
  getExceptionClass({
    searchExceptionClassName: val,
  }).then(res => {
    callback(
      (res.data || []).map(item => ({
        value: item.fullyQualifiedName,
        label: item.simpleClassName,
      })),
    );
  });
});

export const isValidateConfig = config => {
  console.log(config);
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const formItemLayout1 = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};
function CatchForm({ node, dispatch, disabled = false }) {
  const [visibleModal, setVisibleModal] = useState();
  const [expectionList, setExpectionList] = useState([]);
  const [showBtns, setShowBtns] = useState(!node.weimobConfigSaved);
  const [form] = Form.useForm();

  const setNodeConfigStatus = (formData: object, status: boolean) => {
    const { nodeId, nodeType, graphConfig, nodeLevelIndex } = node;
    dispatch({
      type: 'workFlow/setConfigAndCompleteStatus',
      payload: {
        [CONFIG_KEY]: {
          nodeId,
          nodeType,
          ...formData,
        },
        graphConfig,
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

  function onChange(value) {
    // console.log(`selected ${value}`);
    const map = {};
    const list = value || [];
    list.forEach(val => {
      map[val] =
        (node.graphConfig || {})[val] ||
        expectionList.find(i => i.value === val).label;
    });
    node.graphConfig = map;
  }

  function onSearch(val) {
    if ((val || '').trim()) {
      debounceGetExceptionClass(val, setExpectionList);
    }
  }
  useEffect(() => {
    setExpectionList(
      Object.keys(node.graphConfig || {}).map(key => ({
        value: key,
        label: node.graphConfig[key],
      })),
    );
  }, [node]);

  useEffect(() => {
    form.resetFields();
    const initData = node[CONFIG_KEY] || {
      conditionType: 'catch',
      catchClassNames: [],
    };
    const { ...data } = initData;

    form.setFieldsValue({
      ...data,
    });
  }, [node, form]);

  const [addForm] = Form.useForm();
  const onAdd = data => {
    // console.log(data);
    addExceptionClass(data || {}).then(res => {
      if (res.errcode == 0) {
        message.success(res.errmsg || '添加成功');
        setVisibleModal(false);
      } else {
        message.error(res.errmsg);
      }
    });
  };

  return (
    <div className="form-config-container">
      <Form
        {...formItemLayout}
        form={form}
        onFinish={SumbitForm}
        onValuesChange={onValuesChange}
      >
        <Item label="条件" name="conditionType" rules={[{ required: true }]}>
          <Input disabled={true} />
        </Item>
        <Row>
          <Col span="19">
            <Item
              {...formItemLayout1}
              label="异常"
              name="catchClassNames"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                mode="multiple"
                allowClear
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                disabled={disabled}
              >
                {expectionList.map(({ value, label }) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span="5">
            <Button
              disabled={disabled}
              onClick={() => setVisibleModal(true)}
              type="primary"
            >
              新 建
            </Button>
          </Col>
        </Row>

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

      <Modal
        style={{ top: 20, right: 0 }}
        title="增加异常类型"
        visible={visibleModal}
        onOk={() => {
          addForm.submit();
        }}
        onCancel={() => setVisibleModal(false)}
      >
        <Form {...formItemLayout} form={addForm} onFinish={onAdd}>
          <Item
            label="类名"
            name="simpleClassName"
            rules={[{ required: true }]}
          >
            <Input disabled={disabled} />
          </Item>
          <Item
            label="路径名"
            name="fullyQualifiedName"
            rules={[{ required: true }]}
          >
            <Input disabled={disabled} />
          </Item>
        </Form>
      </Modal>
    </div>
  );
}
export default function TryCatchForm({ node, dispatch, disabled = false }) {
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

TryCatchForm.CatchForm = CatchForm;
