import { config as defaultConfig } from './ChildNode';
import {
  NODE_TYPE_ASYNC,
  NODE_TYPE_ASYNC_CHILD,
} from '../../constant';
import { CollapseNode } from "../baseNode"

export const config = {
  icon: 'asyncIcon',
  label: 'Async',
  nodeType: NODE_TYPE_ASYNC,
  childrenAbleTypes: [NODE_TYPE_ASYNC_CHILD],
  draggable: true,
  configCompleteStatus: true,
  children: [
    {
      ...defaultConfig
    },
  ],
}


const AsyncNode = CollapseNode;
export default AsyncNode;

