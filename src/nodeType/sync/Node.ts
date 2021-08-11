import { config as defaultConfig } from './ChildNode';
import {
  NODE_TYPE_SYNC,
  NODE_TYPE_SYNC_CHILD,
} from '../../constant';
import { CollapseNode } from "../baseNode"

export const config = {
  icon: 'syncIcon',
  label: 'Sync',
  nodeType: NODE_TYPE_SYNC,
  childrenAbleTypes: [NODE_TYPE_SYNC_CHILD],
  draggable: true,
  configCompleteStatus: true,
  children: [
    {
      ...defaultConfig
    },
  ],
}


const SyncNode = CollapseNode;
export default SyncNode;

