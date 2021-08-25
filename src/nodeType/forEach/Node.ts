import { config as defaultConfig } from './ChildNode';
import {
  NODE_TYPE_FOR_EACH,
  NODE_TYPE_FOR_EACH_CHILD,
} from '../../constant';
import { CollapseNode } from "../baseNode"

export const config = {
  icon: 'forEachIcon',
  label: 'ForEach',
  nodeType: NODE_TYPE_FOR_EACH,
  childrenAbleTypes: [NODE_TYPE_FOR_EACH_CHILD],
  draggable: true,
  configCompleteStatus: true,
  children: [
    {
      ...defaultConfig
    },
  ],
}


const ForeachNode = CollapseNode;
export default ForeachNode;

