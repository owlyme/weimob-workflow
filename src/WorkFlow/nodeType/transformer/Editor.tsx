import React, { useRef, useEffect, useState } from 'react';
import { Modal, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';

interface ModalPreviewProps {
  visible: boolean;
  initData: object;
  onClose: () => void;
  onOk: () => void;
}

const ModalPreview: React.FC<ModalPreviewProps> = props => {
  const { visible, initData, onClose, onOk } = props;
  const [isMounted, setMounted] = useState(false);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any) {
    setMounted(true);
    editorRef.current = editor;
    editor.getAction('editor.action.formatDocument').run();
  }

  function getValue() {
    return editorRef.current.getValue();
  }

  function onOkModal() {
    onOk(getValue());
  }

  const PopoverContnet = (
    <ul>
      <li>message[payload] 取上个节点的值</li>
      <li>message[variables] 取Context中的值</li>
    </ul>
  );

  useEffect(() => {
    if (editorRef.current && isMounted) {
      editorRef.current.setValue(initData);
    }
  }, [editorRef, initData, isMounted]);

  return (
    <Modal
      width={800}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>编辑内容 </div>
          <Popover
            placement="rightTop"
            content={PopoverContnet}
            trigger="click"
          >
            <QuestionCircleOutlined />
          </Popover>
        </div>
      }
      visible={visible}
      onOk={onOkModal}
      onCancel={onClose}
    >
      <Editor
        height="550px" // By default, it fully fits with its parent
        theme="vs-dark"
        defaultLanguage="Java"
        defaultValue=""
        onMount={handleEditorDidMount}
      />
    </Modal>
  );
};

export default ModalPreview;
