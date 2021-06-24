import { config as defaultConfig } from './ChildNode';
import {
  NODE_TYPE_PARALLEL_AGGR,
  NODE_TYPE_PARALLEL_CHILD
} from '../../constant';
import { CollapseNode } from "../baseNode"

export const config = {
  icon: 'parallelIcon',
  label: 'Parallel',
  nodeType: NODE_TYPE_PARALLEL_AGGR,
  childrenAbleTypes: [NODE_TYPE_PARALLEL_CHILD],
  draggable: true,
  configCompleteStatus: true,
  
  children: [
    {
      ...defaultConfig
    },
  ],
}


const ParallelNode = CollapseNode;
export default ParallelNode;

