import { NodeConfig } from '../../core/types';
import { NODE_TYPE_OBJECT_STORE } from '../../constant';
import { CommonNode } from "../baseNode"

export const ObjectStoreConfig:NodeConfig = {
  icon: 'objectStoreIcon',
  label: 'ObjectStore',
  nodeType: NODE_TYPE_OBJECT_STORE,
  draggable: true,
  childrenAbleTypes: [],
}

const ObjectStoreNode = CommonNode;

export default ObjectStoreNode;
