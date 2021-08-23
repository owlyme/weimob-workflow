export const CONFIG_KEY = 'weimob_cfg';

// 节点类型定义
export const NODE_TYPE_LISTENER = 'listener';
export const NODE_TYPE_PROCESSOR = 'processor';
export const NODE_TYPE_CHOICE = 'choice';
export const NODE_TYPE_CONNECTOR = 'connector';
export const NODE_TYPE_CHOICE_WHEN = 'choiceWhen';
export const NODE_TYPE_CHOICE_DEFAULT = 'choiceDefault';
export const NODE_TYPE_PARALLEL = 'parallel';
export const NODE_TYPE_PARALLEL_AGGR = 'parallelAggr';
export const NODE_TYPE_PARALLEL_CHILD = 'parallelChild';
export const NODE_TYPE_PLACEHOLDER = 'placeholder';
export const NODE_TYPE_TRY = 'try';
export const NODE_TYPE_TRY_NORMAL = 'tryNormal';
export const NODE_TYPE_TRY_CATCH = 'tryCatch';
export const NODE_TYPE_TRY_FINALLY = 'tryFinally';
export const NODE_TYPE_TRANSFORMER = 'transformer';
export const NODE_TYPE_ASYNC = 'async';
export const NODE_TYPE_ASYNC_CHILD = 'asyncChild';
export const NODE_TYPE_END = 'end';
export const NODE_TYPE_MQ = 'mq';
export const NODE_TYPE_ARTEMIS = 'artemis';
export const NODE_TYPE_OBJECT_STORE = 'objectStore';
export const NODE_TYPE_SYNC = 'sync';
export const NODE_TYPE_SYNC_CHILD = 'syncChild';
export const NODE_TYPE_REDIS = 'redis';
export const NODE_TYPE_SET_CONTEXT = 'setContext';
export const NODE_TYPE_SET_PAYLOAD = 'setPayload';
export const NODE_TYPE_FOR_EACH = 'forEach';
export const NODE_TYPE_FOR_EACH_CHILD = 'forEachChild';

export const nodeTypeSet = {
    NODE_TYPE_LISTENER,
    NODE_TYPE_PROCESSOR,
    NODE_TYPE_CHOICE,
    NODE_TYPE_CONNECTOR,
    NODE_TYPE_CHOICE_WHEN,
    NODE_TYPE_CHOICE_DEFAULT,
    NODE_TYPE_PARALLEL,
    NODE_TYPE_PARALLEL_AGGR,
    NODE_TYPE_PARALLEL_CHILD,
    NODE_TYPE_PLACEHOLDER,
    NODE_TYPE_TRY,
    NODE_TYPE_TRY_NORMAL,
    NODE_TYPE_TRY_CATCH,
    NODE_TYPE_TRY_FINALLY,
    NODE_TYPE_TRANSFORMER,
    NODE_TYPE_ASYNC,
    NODE_TYPE_ASYNC_CHILD,
    NODE_TYPE_END,
    NODE_TYPE_MQ,
    NODE_TYPE_ARTEMIS,
    NODE_TYPE_OBJECT_STORE,
    NODE_TYPE_SYNC,
    NODE_TYPE_SYNC_CHILD,
    NODE_TYPE_REDIS,
    NODE_TYPE_SET_CONTEXT,
    NODE_TYPE_SET_PAYLOAD,
    NODE_TYPE_FOR_EACH,
    NODE_TYPE_FOR_EACH_CHILD,
}
