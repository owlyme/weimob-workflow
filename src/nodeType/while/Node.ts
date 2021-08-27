import { config as defaultConfig } from './ChildNode';
import {
  NODE_TYPE_WHILE,
  NODE_TYPE_WHILE_CHILD,
} from '../../constant';
import { CollapseNode } from "../baseNode"

export const config = {
  icon: 'forEachIcon',
  label: 'While',
  nodeType: NODE_TYPE_WHILE,
  childrenAbleTypes: [NODE_TYPE_WHILE_CHILD],
  draggable: true,
  configCompleteStatus: true,
  children: [
    {
      ...defaultConfig
    },
  ],
}


const WhileNode = CollapseNode;
export default WhileNode;

