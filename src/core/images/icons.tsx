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
  endIcon: 'iconend',
  asyncIcon: "iconasync",
  mqIcon: "iconMQ",
  objectStoreIcon: "iconObjectStore",
  syncIcon: "iconSync",
};

export default function IconCom({ type, ...other }: any) {

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
