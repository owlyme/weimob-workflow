import { 
  NodeTypeConfigs,
  nodeTypeSet
} from 'weimob-workflow';

const List = [
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_LISTENER],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_PROCESSOR],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_CHOICE],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_PARALLEL_AGGR],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_TRY],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_CONNECTOR],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_TRANSFORMER],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_ASYNC],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_MQ],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_ARTEMIS],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_OBJECT_STORE],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_SYNC],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_REDIS],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_SET_CONTEXT],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_SET_PAYLOAD],
  NodeTypeConfigs[nodeTypeSet.NODE_TYPE_FOR_EACH],
];

export const processorNodeConfig = NodeTypeConfigs[nodeTypeSet.NODE_TYPE_PROCESSOR];

export default List;
