import { NodeConfig } from '../../core/types';
import { NODE_TYPE_LISTENER } from '../../constant';


export const ListenerConfig:NodeConfig = {
  icon: 'listenerIcon',
  label: 'Listener',
  nodeType: NODE_TYPE_LISTENER,
  draggable: false,
  deleteForbidden: true,
  childrenAbleTypes: [],
}



