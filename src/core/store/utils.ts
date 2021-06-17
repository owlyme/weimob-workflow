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

export const saveWorkFlowNodesToLocal = (workFlowNodes: any) => {
  localStorage.workFlowNodes = JSON.stringify(workFlowNodes);
};

export const getWorkFlowNodes = () => {
  return localStorage.workFlowNodes
    ? JSON.parse(localStorage.workFlowNodes)
    : null;
};
let count: any = null;
export const createNodeId = (startNum = 'n-000') => {
  if (count === null) {
    count = Number((startNum || '').replace('n-', '')) || 0;
  } else {
    count = Number(count);
  }
  count++;
  let s = '';

  if (count < 10) {
    s = '00' + count;
  } else if (count < 100) {
    s = '0' + count;
  } else {
    s = count;
  }

  return `n-${s}`;
};

export function createNodesNodeId(node: any, startNum = 'n-000') {
  let lastNodeId: any = null;
  function fn(nodes: any) {
    if (!nodes) return [];
    return nodes.reduce((acc: any[], node: any) => {
      const nodeId = createNodeId(startNum);
      lastNodeId = nodeId;

      const newNode = {
        ...node,
        nodeId,
        children: fn(node.children),
      };
      return acc.concat(newNode);
    }, []);
  }

  return [fn([node])[0], lastNodeId];
}

export function parseIndex(index: string | number[]): number[] {
  return Array.isArray(index)
    ? index
    : String(index || '0-0')
        .split('-')
        .map(str => Number(str));
}

export function getTargetNode(levelIndexArr: number[], rootNode: any): any {
  let index = 0;

  const targetNode = levelIndexArr.reduce(
    (acc, indexValue) => {
      if (index === levelIndexArr.length - 1) {
        return acc[indexValue];
      }
      index++;
      return acc[indexValue]?.children;
    },
    [rootNode],
  );

  return targetNode;
}

export function isSameAncestorsLevel(
  dragNodeLevelIndex: string,
  edgeNodeLevelIndex: string,
): boolean {
  const dragNodeLevelDepth = dragNodeLevelIndex.length;
  const dragNodeParentLevelIndex = dragNodeLevelIndex.substr(
    0,
    dragNodeLevelDepth - 1,
  );
  return edgeNodeLevelIndex.indexOf(dragNodeParentLevelIndex) === 0;
}

export function addNodeChoice(choiceNode: any, nodeId: string): void {
  choiceNode?.children?.forEach((node: any) => (node.nodeId = nodeId));
}
