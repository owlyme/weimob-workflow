import React from 'react';
import './symbols.js';
import './style.less';

const iconMaps = {
  listenerIcon: 'iconlistener',
  processorIcon: 'iconprocessor',
  choiceIcon: 'iconjilianxuanze',
  parallelIcon: 'iconparallel',
  tryIcon: 'iconCatch',
  connectorIcon: 'iconconnection',
  transformerIcon: 'icontransfer1',
};

export default function IconCom({ type, ...other }: any) {
  // return <img alt="icon" src={iconMaps[type] || type} {...other} />;
  return /(data:image)|(\/\/)/.test(type || '') ? (
    <img
      draggable={false}
      alt="icon"
      style={{ width: 30, height: 30 }}
      src={iconMaps[type] || type}
      {...other}
    />
  ) : (
    <svg className="icon-svg" aria-hidden="true">
      <use xlinkHref={`#${iconMaps[type]}`}></use>
    </svg>
  );
}
