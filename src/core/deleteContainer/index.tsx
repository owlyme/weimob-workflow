import React, { useRef, useEffect } from 'react';
import { Modal, message } from 'antd';

export default function DeleteContainer({
  dispatch,
  workFlow,
  children,
  onAfterNodeMounted = (f:any) => f,
  ...props
}: any) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current:HTMLDivElement | null = box.current;
    if (!current) return
    onAfterNodeMounted(current)
    const remove:any = (event: any) => {
      const k = event.keyCode;
      if ((k == 8 || k == 46) && !remove.open) {
        //backspace 或 delete键
        (remove as any).open = true;
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
              (remove as any).open = false;
            },
            onCancel() {
              (remove as any).open = false;
            },
          });
        }
      }
    };

    // workFlowStatus
    current.onmouseover = () => {
      current.focus({
        preventScroll: true,
      });
    };
    current.onmouseout = () => {
      current.blur();
    };
    if (workFlow.currentNode?.nodeLevelIndex) {
      current.addEventListener('keydown', remove);
    }

    return () => {
      (remove as any).open = false;
      current.removeEventListener('keydown', remove);
    };
  }, [dispatch, workFlow, box]);

  return (
    <div ref={box} {...props} tabIndex="-1">
      {children}
    </div>
  );
}
