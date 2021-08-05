import { NodeConfig } from '../../core/types';
import { NODE_TYPE_ARTEMIS } from '../../constant';
import { CommonNode } from "../baseNode"

export const ArtemisConfig:NodeConfig = {
  icon: 'mqIcon',
  label: 'Artemis',
  nodeType: NODE_TYPE_ARTEMIS,
  draggable: true,
  childrenAbleTypes: [],
}

const ArtemisNode = CommonNode;

export default ArtemisNode;
