import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

const style = {
  height: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#40a9ff',
};

export default function AddBtn({onAddNode }:any) {
  const addChildren = (evt:any) => {
    evt.stopPropagation();
    onAddNode(evt);
  };

  return (
    <div className="add-node-btn" style={style} onClick={addChildren}>
      <PlusCircleOutlined style={{ background: '#fff' }} />
    </div>
  );
}

export function AddBtnOnline(props: React.FC<Props>) {
  return (
    <div className="add-node-btn-container">
      <AddBtn {...props} />
    </div>
  );
}
