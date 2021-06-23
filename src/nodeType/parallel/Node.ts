import { config as defaultConfig } from './ChildNode';
import {
  NODE_TYPE_PARALLELAggr,
  NODE_TYPE_PARALLEL_CHILD
} from '../../constant';
import { CollapseNode } from "../baseNode"

export const config = {
  icon: 'parallelIcon',
  label: 'Parallel',
  nodeType: NODE_TYPE_PARALLELAggr,
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

