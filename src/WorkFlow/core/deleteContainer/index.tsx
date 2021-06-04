import React, { useRef, useEffect } from 'react';
import { Modal, message } from 'antd';

export default function DeleteContainer({
  dispatch,
  workFlow,
  children,
  ...props
}) {
  const box = useRef();
  useEffect(() => {
    const { current } = box;
    function remove(event) {
      const k = event.keyCode;
      if ((k == 8 || k == 46) && !remove.open) {
        //backspace 或 delete键
        remove.open = true;
        if (workFlow.currentNode.deleteForbidden) {
          message.error('当前节点不可删除');
        } else {
          Modal.confirm({
            content: '您确定删除当前节点？',
            onOk() {
              dispatch({
                type: 'workFlow/removeNode',
                payload: {
                  node: workFlow.currentNode,
                  nodeLevelIndex: workFlow.currentNode.nodeLevelIndex,
                },
              });
              remove.open = false;
            },
            onCancel() {
              remove.open = false;
            },
          });
        }
      }
    }
    // workFlowStatus
    current.onmouseover = () => {
      current.focus({
        preventScroll: true,
      });
    };
    current.onmouseout = () => {
      current.blur();
    };
    if (workFlow.currentNode.nodeLevelIndex) {
      current.addEventListener('keydown', remove);
    }

    return () => {
      remove.open = false;
      current.removeEventListener('keydown', remove);
    };
  }, [dispatch, workFlow, box]);
  return (
    <div ref={box} {...props} tabIndex="-1">
      {children}
    </div>
  );
}
