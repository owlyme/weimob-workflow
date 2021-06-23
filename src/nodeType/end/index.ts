import { NodeConfig } from '../../core/types';
import { CommonNode } from "../baseNode"
import {
  NODE_TYPE_END,
} from '../../constant';


export const EndConfig:NodeConfig = {
  icon: 'endIcon',
  label: 'End',
  nodeType: NODE_TYPE_END,
  draggable: false,
  showActions: false,
  childrenAbleTypes: [],
  nodeId: "n-000",
  configCompleteStatus: true
}

const ListenerNode = CommonNode;

export default ListenerNode;


