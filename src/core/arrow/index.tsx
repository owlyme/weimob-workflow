import React from 'react';
import './style.less';

export default function Arrow({ dashed=false }: {dashed:boolean}) {
  return (
    <div className="arrow-element-wrap">
      <div className={dashed ? "arrow-dash-border" : "arrow-border"}></div>
      <div className="arrow-element"></div>
    </div>
  );
}
