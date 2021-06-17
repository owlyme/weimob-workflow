import { NodeConfig } from '../../core/types';
import { NODE_TYPE_LISTENER } from '../../constant';
import { CommonNode } from "../baseNode"



export const ListenerConfig:NodeConfig = {
  icon: 'listenerIcon',
  label: 'Listener',
  nodeType: NODE_TYPE_LISTENER,
  draggable: false,
  childrenAbleTypes: [],
}

const ListenerNode = CommonNode;

export default ListenerNode;


