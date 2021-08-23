import { 
  NodeTypeConfigs,
  NODE_TYPE_LISTENER,
  NODE_TYPE_PROCESSOR,
  NODE_TYPE_CHOICE,
  NODE_TYPE_PARALLEL,
  NODE_TYPE_TRY,
  NODE_TYPE_CONNECTOR,
  NODE_TYPE_TRANSFORMER,
  NODE_TYPE_ASYNC,
  NODE_TYPE_MQ,
  NODE_TYPE_ARTEMIS,
  NODE_TYPE_OBJECT_STORE,
  NODE_TYPE_SYNC,
  NODE_TYPE_REDIS,
  NODE_TYPE_SET_CONTEXT,
  NODE_TYPE_SET_PAYLOAD,
  NODE_TYPE_FOR_EACH
} from 'weimob-workflow';


const List = [
  NodeTypeConfigs[NODE_TYPE_LISTENER],
  NodeTypeConfigs[NODE_TYPE_PROCESSOR],
  NodeTypeConfigs[NODE_TYPE_CHOICE],
  NodeTypeConfigs[NODE_TYPE_PARALLEL],
  NodeTypeConfigs[NODE_TYPE_TRY],
  NodeTypeConfigs[NODE_TYPE_CONNECTOR],
  NodeTypeConfigs[NODE_TYPE_TRANSFORMER],
  NodeTypeConfigs[NODE_TYPE_ASYNC],
  NodeTypeConfigs[NODE_TYPE_MQ],
  NodeTypeConfigs[NODE_TYPE_ARTEMIS],
  NodeTypeConfigs[NODE_TYPE_OBJECT_STORE],
  NodeTypeConfigs[NODE_TYPE_SYNC],
  NodeTypeConfigs[NODE_TYPE_REDIS],
  NodeTypeConfigs[NODE_TYPE_SET_CONTEXT],
  NodeTypeConfigs[NODE_TYPE_SET_PAYLOAD],
  NodeTypeConfigs[NODE_TYPE_FOR_EACH],

];

export const processorNodeConfig = NodeTypeConfigs[NODE_TYPE_PROCESSOR];

export default List;
