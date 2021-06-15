import React from 'react';
import { Collapse } from 'antd';
import './style.less';

const { Panel } = Collapse;
export default function CollapseContainer({ header, children }: any) {
  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <Panel header={header} key="1">
        <div>{children}</div>
      </Panel>
    </Collapse>
  );
}
