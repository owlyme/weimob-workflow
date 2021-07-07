import React from "react";
import Arrow from "./index";

export function getPosition(viewPort: HTMLElement) {
  if (!viewPort) return
  const ele1 = viewPort.querySelector('#end div[data-node-type=end]')
  const ele2 = viewPort.querySelector('#workflow-nodes-layout > .node-edge-conatiner:last-child div.node-container');
  if (!ele1 || !ele2) return {display: "none" }

  const p0 = viewPort.getBoundingClientRect();
  const p1 = ele1.getBoundingClientRect();
  const p2 = ele2.getBoundingClientRect();

  const p = {
    x: p1.x - p0.x + p1.width,
    y: p2.y - p0.y + p2.height,
    w: p2.right - p1.right - p2.width / 2,
    h: p1.bottom - p2.bottom - p1.height / 2
  }

  return {
    display: p.w < 20 ? "none" : "block",
    top: p.y,
    left: p.x,
    width: p.w,
    height: p.h,
    position: "absolute",
    borderRight: '1px solid #999',
    borderBottom: '1px solid #999',
    transition: "all 0.1",
  }
}

export default function Polyline(props: any) {
  return <div
    {...props}>
    <div style={{
      transform: "rotate(180deg)",
      position: "absolute",
      left: "0px",
      bottom: "-7.5px",
      width: "7px"
    }}>
      <Arrow />
    </div>

  </div>
};
