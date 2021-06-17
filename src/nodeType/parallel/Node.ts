import { config as defaultConfig } from './ChildNode';
import {
  NODE_TYPE_PARALLEL,
  NODE_TYPE_PARALLEL_CHILD,
  CONFIG_KEY,
} from '../../constant';
import { CollapseNode } from "../baseNode"

export const config = {
  icon: 'parallelIcon',
  label: 'Parallel',
  nodeType: NODE_TYPE_PARALLEL,
  childrenAbleTypes: [NODE_TYPE_PARALLEL_CHILD],
  draggable: true,
  configCompleteStatus: true,
  [CONFIG_KEY]: {
    cfg: {
      parallel: [],
    },
  },
  children: [
    {
      ...defaultConfig
    },
  ],
}


const ParallelNode = CollapseNode;
export default ParallelNode;

