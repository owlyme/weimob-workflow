import { NodeConfig } from '../../core/types';
import { NODE_TYPE_TRANSFORMER } from '../../constant';
import { CommonNode } from "../baseNode"

export const transformerConfig:NodeConfig = {
  icon: 'transformerIcon',
  label: 'Transformer',
  nodeType: NODE_TYPE_TRANSFORMER,
  draggable: true,
  childrenAbleTypes: [],
  configCompleteStatus: true
}

const TransformerNode = CommonNode;

export default TransformerNode;


