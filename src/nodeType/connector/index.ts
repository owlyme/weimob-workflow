import { NodeConfig } from '../../core/types';
import { NODE_TYPE_CONNECTOR } from '../../constant';
import { CommonNode } from "../baseNode"

export const connectorConfig:NodeConfig = {
  icon: 'connectorIcon',
  label: 'Connector',
  nodeType: NODE_TYPE_CONNECTOR,
  draggable: true,
  childrenAbleTypes: [],
}

const ConnectorNode = CommonNode;

export default ConnectorNode;
