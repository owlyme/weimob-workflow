import {
  initState,
  createNodesNodeId,
  parseIndex,
  getTargetNode,
  isSameAncestorsLevel,
} from './utils';
import { debounce } from '../utils/index';

export const CONFIG_KEY = 'weimob_cfg';

function createDataStore() {
  const store = {
    state: initState(),
    effects: {
      // 移动节点到edge节点上
      async onDragSortEnd(
        {
          payload: {
            dragNode,
            dragNodeLevelIndex,
            edgeNodeLevelIndex,
            isSameParnet,
          },
        }: any,
        { put }: any,
      ) {
        try {
          const dargNodeIndexArr = parseIndex(dragNodeLevelIndex);
          const edgeNodeIndexArr = parseIndex(edgeNodeLevelIndex);
          // 移除原节点
          if (dragNodeLevelIndex) {
            await put({
              type: 'removeNode',
              payload: {
                node: dragNode,
                nodeLevelIndex: dragNodeLevelIndex,
              },
            });
          }
          // 插入节点
          if (isSameParnet) {
            await put({
              type: 'insertBrotherNode',
              payload: {
                node: dragNode,
                nodeLevelIndex: edgeNodeLevelIndex,
                order:
                  isSameParnet &&
                  dargNodeIndexArr[dargNodeIndexArr.length - 1] >
                    edgeNodeIndexArr[edgeNodeIndexArr.length - 1]
                    ? 1
                    : 0,
              },
            });
          } else {
            let newEdgeNodeLevelIndex = edgeNodeLevelIndex;

            if (
              dargNodeIndexArr.length < edgeNodeIndexArr.length &&
              dargNodeIndexArr[dargNodeIndexArr.length - 1] <
                edgeNodeIndexArr[dargNodeIndexArr.length - 1] &&
              isSameAncestorsLevel(dragNodeLevelIndex, edgeNodeLevelIndex)
            ) {
              newEdgeNodeLevelIndex = edgeNodeIndexArr.map((i, index) => {
                if (index === dargNodeIndexArr.length - 1) {
                  return i - 1;
                }
                return i;
              });
            }

            await put({
              type: 'insertBrotherNode',
              payload: {
                node: dragNode,
                nodeLevelIndex: newEdgeNodeLevelIndex,
                order: 1,
              },
            });
          }

          await put({
            type: 'saveDragingNodeData',
            payload: {},
          });
        } catch (error) {
          console.log(error);
        }
      },
      // 移动节点到一个空父节点
      async onMoveNode(
        { payload: { dragNode, dragNodeLevelIndex, targetNode } }: any,
        { put }: any,
      ) {
        try {
          await put({
            type: 'insertNodeToTargetNode',
            payload: {
              node: dragNode,
              targetNode: targetNode,
            },
          });

          await put({
            type: 'removeNode',
            payload: {
              node: dragNode,
              nodeLevelIndex: dragNodeLevelIndex,
            },
          });

          await put({
            type: 'saveDragingNodeData',
            payload: {},
          });
        } catch (err) {
          console.log(err);
        }
      },
      // 从工具栏拖放新的节点
      async onAddNodeDragEnd(
        { payload: { dragNode, dragEnterNode } }: any,
        { put }: any,
      ) {
        try {
          await put({
            type: 'insertNodeToTargetNode',
            payload: {
              node: dragNode,
              targetNode: dragEnterNode,
            },
          });

          await put({
            type: 'saveDragingNodeData',
            payload: {},
          });
        } catch (err) {
          console.log(err);
        }
      },
      // 配置节点属性以及修改 configCompleteStatus
      async setConfigAndCompleteStatus(
        { payload, callback }: any,
        { put }: any,
      ) {
        try {
          const { nodeLevelIndex, nodeProperties = {}, ...config } = payload;
          await put({
            type: 'setCurrentNodeConfig',
            payload: config,
          });

          await put({
            type: 'setNodePorpertiesAndValues',
            payload: {
              nodeLevelIndex,
              ...nodeProperties,
            },
          });
          callback && callback();
        } catch (err) {
          console.log(err);
        }
      },
    },

    reducers: {
      // 清空当前状态
      resetState() {
        return initState();
      },
      // 根据接口数据回填
      setWorkFlowNodes(state: any, { payload }: any) {
        try {
          const { graph } = JSON.parse(payload.visualConfig);
          if (graph) {
            state.workFlowNodes = graph;
          } else {
            state.workFlowNodes = initState().workFlowNodes;
          }
          return state;
        } catch (err) {
          state = initState();
          console.log(err);
          return state;
        }
      },
      // 设置当前选中节点
      setCurrentNode(state: any, { payload: { node } }: any) {
        state.currentNode = node;
        return state;
      },
      // 给选目标节点添加子节点
      insertNodeToTargetNode(
        state: any,
        { payload: { node, targetNode } }: any,
      ) {
        const { workFlowNodes } = state;

        const [newNode, maxNodeId] = createNodesNodeId(
          node,
          workFlowNodes.maxNodeId,
        );
        workFlowNodes.maxNodeId = maxNodeId;

        const indexArr: number[] = parseIndex(
          targetNode?.nodeLevelIndex || '0',
        );
        const targetNodeData = getTargetNode(indexArr, workFlowNodes);
        const children = targetNodeData?.children || [];

        children.push(newNode);
        targetNodeData.children = children;

        workFlowNodes.unSaved = true;
        return state;
      },
      // 删除节点
      removeNode(state: any, { payload: { nodeLevelIndex } }: any) {
        const { workFlowNodes } = state;
        const indexArr = parseIndex(nodeLevelIndex);
        const parentLevelIndexArr = indexArr.slice(0, indexArr.length - 1);
        const currentIndex = indexArr[indexArr.length - 1];
        const targetNode = getTargetNode(parentLevelIndexArr, workFlowNodes);

        targetNode.children.splice(currentIndex, 1);

        // 清空 currentNode
        state.currentNode = {};
        workFlowNodes.unSaved = true;

        return state;
      },
      // 插入兄弟的节点 order : 0, 1
      insertBrotherNode(
        state: any,
        { payload: { node, nodeLevelIndex, order } }: any,
      ) {
        const { workFlowNodes } = state;
        const insertOder = typeof order === 'number' ? order : 1;
        let newNode = node;
        if (!node.nodeId) {
          const [_newNode, maxNodeId] = createNodesNodeId(
            node,
            workFlowNodes.maxNodeId,
          );
          newNode = _newNode;
          workFlowNodes.maxNodeId = maxNodeId;
        }
        const indexArr = parseIndex(nodeLevelIndex);
        const parentLevelIndexArr = indexArr.slice(0, indexArr.length - 1);
        const insterIndex = indexArr[indexArr.length - 1];

        const targetNode = getTargetNode(parentLevelIndexArr, workFlowNodes);
        targetNode.children.splice(insterIndex + insertOder, 0, newNode);

        workFlowNodes.unSaved = true;

        return state;
      },
      // 替换PlaceHolder节点 后期会删掉此方法
      replacePlaceholderNode(
        state: any,
        { payload: { node, wantToReplaceNodeLevelIndex } }: any,
      ) {
        const { currentNode, workFlowNodes } = state;

        const [newNode, maxNodeId] = createNodesNodeId(
          node,
          workFlowNodes.maxNodeId,
        );
        workFlowNodes.maxNodeId = maxNodeId;

        const indexArr = parseIndex(
          wantToReplaceNodeLevelIndex || currentNode.nodeLevelIndex,
        );
        const parentLevelIndexArr = indexArr.slice(0, indexArr.length - 1);
        const insterIndex = indexArr[indexArr.length - 1];
        const targetNode = getTargetNode(parentLevelIndexArr, workFlowNodes);

        targetNode.children.splice(insterIndex, 1, newNode);
        targetNode.nodeLevelIndex = parentLevelIndexArr.join('-');
        state.currentNode = targetNode;
        workFlowNodes.unSaved = true;

        return state;
      },
      // 设置属性
      setCurrentNodeConfig(state: any, { payload }: any) {
        const { currentNode, workFlowNodes } = state;
        const indexArr = parseIndex(currentNode.nodeLevelIndex);
        const targetNode = getTargetNode(indexArr, workFlowNodes);

        targetNode[CONFIG_KEY] = payload[CONFIG_KEY];
        if (payload.graphConfig) {
          targetNode.graphConfig = payload.graphConfig;
        }
        targetNode.weimobConfigSaved = true;
        workFlowNodes.unSaved = true;
        return state;
      },
      // 修改配置
      setNodePorpertiesAndValues(
        state: any,
        { payload: { nodeLevelIndex, ...keyValues } }: any,
      ) {
        if (nodeLevelIndex) {
          const { workFlowNodes } = state;
          const indexArr = parseIndex(nodeLevelIndex);
          const targetNode = getTargetNode(indexArr, workFlowNodes);
          Object.assign(targetNode, keyValues);
        }
        return state;
      },
      // 保存拖动的节点数据
      saveDragingNodeData(
        state: any,
        { payload: { node, nodeLevelIndex, parentNodeId } }: any,
      ) {
        state.dragNodeData = {
          node,
          nodeLevelIndex,
          parentNodeId,
        };
      },
      //
      setWorkFlowSaved(state: any) {
        state.workFlowNodes.unSaved = false;
      },
    },
  };

  const put = ({ type, ...others }: any) => {
    return new Promise(resolve => {
      const reducers = store.reducers;
      if (reducers[type]) {
        store.state = reducers[type](store.state, others) || store.state;
      }

      resolve(store.state);
    });
  };

  const debounceSubscribe: any[] = [];

  const instance = {
    dispatch({ type, ...others }: any) {
      let action = (type || '').split('/');
      if (action.length === 1) {
        action = action[0];
      } else {
        action = action[1];
      }
      const effects = store.effects;
      const reducers = store.reducers;
      if (effects[action]) {
        effects[action](others, { put });
      }

      if (reducers[action]) {
        reducers[action](store.state, others);
      }

      // debounceSubscribe(store.state);
      debounceSubscribe.forEach(sub => {
        sub(store.state);
      });
    },
    getState() {
      return { ...store.state };
    },
    subscribe(callback: any) {
      debounceSubscribe.push(debounce(callback, 10));
    },
  };

  return instance;
}

export default createDataStore;
