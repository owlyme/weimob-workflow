import { NodeConfig } from '../../core/types';
import { NODE_TYPE_MQ } from '../../constant';
import { CommonNode } from "../baseNode"



export const MqConfig:NodeConfig = {
  icon: 'mqIcon',
  label: 'MQ',
  nodeType: NODE_TYPE_MQ,
  draggable: false,
  childrenAbleTypes: [],
}

const MqNode = CommonNode;

export default MqNode;


