import { NodeTypeConfigs } from 'weimob-workflow';
import {
  NODE_TYPE_LISTENER,
  NODE_TYPE_PROCESSOR,
  NODE_TYPE_CHOICE,
  NODE_TYPE_PARALLEL,
  NODE_TYPE_TRY,
  NODE_TYPE_CONNECTOR,
  NODE_TYPE_TRANSFORMER,
} from '../constant';

const List = [
  NodeTypeConfigs[NODE_TYPE_LISTENER],
  NodeTypeConfigs[NODE_TYPE_PROCESSOR],
  NodeTypeConfigs[NODE_TYPE_CHOICE],
  NodeTypeConfigs[NODE_TYPE_PARALLEL],
  NodeTypeConfigs[NODE_TYPE_TRY],
  NodeTypeConfigs[NODE_TYPE_CONNECTOR],
  NodeTypeConfigs[NODE_TYPE_TRANSFORMER],
];

export const processorNodeConfig = NodeTypeConfigs[NODE_TYPE_PROCESSOR];

export default List;
