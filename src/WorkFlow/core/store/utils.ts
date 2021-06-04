export const initState = () => ({
  workFlowNodes: {
    nodeLevelIndex: '0',
    nodeThye: 'root',
    nodeId: 0,
    maxNodeId: 0,
    root: true,
    hasListenerNode: false,
    children: [],
    unSaved: false,
  },
  currentNode: {},
  dragNodeData: {},
  dragEnterNode: null,
});

export const saveWorkFlowNodesToLocal = workFlowNodes => {
  localStorage.workFlowNodes = JSON.stringify(workFlowNodes);
};

export const getWorkFlowNodes = () => {
  return localStorage.workFlowNodes
    ? JSON.parse(localStorage.workFlowNodes)
    : null;
};

export const createNodeId = (startNum = 'n-000') => {
  if (createNodeId.count === undefined) {
    createNodeId.count = Number((startNum || '').replace('n-', '')) || 0;
  } else {
    createNodeId.count = Number(createNodeId.count);
  }
  createNodeId.count++;
  let s = '';
  if (createNodeId.count < 10) {
    s = '00' + createNodeId.count;
  } else if (createNodeId.count < 100) {
    s = '0' + createNodeId.count;
  } else {
    s = createNodeId.count;
  }

  return `n-${s}`;
};

export function createNodesNodeId(node: [], startNum = 'n-000') {
  function fn(nodes) {
    if (!nodes) return [];
    return nodes.reduce((acc, node) => {
      const nodeId = createNodeId(startNum);
      fn.lastNodeId = nodeId;

      const newNode = {
        ...node,
        nodeId,
        children: fn(node.children, startNum),
      };
      return acc.concat(newNode);
    }, []);
  }

  return [fn([node], startNum)[0], fn.lastNodeId];
}

export function parseIndex(index) {
  return String(index || '0-0')
    .split('-')
    .map(str => Number(str));
}


export function getTargetNode(levelIndexArr: [], rootNode: object): object {
  let index = 0;

  const targetNode = levelIndexArr.reduce(
    (acc, indexValue) => {
      if (index === levelIndexArr.length - 1) {
        return acc[indexValue];
      }
      index++;
      return acc[indexValue].children;
    },
    [rootNode],
  );

  return targetNode;
}

export function addNodeChoice(choiceNode = {}, nodeId: string): object {
  choiceNode.children.forEach(node => (node.nodeId = nodeId));
}
