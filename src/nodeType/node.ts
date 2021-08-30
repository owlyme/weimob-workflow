import { NodeConfig } from '../core/types';
import { nodeTypeSet } from '../constant';
import { CommonNode, CollapseNode, ChildrenIsNeed, DropNode, MultipleNode } from "./baseNode";

export const listenerConfig = {
    icon: 'listenerIcon',
    label: 'Listener',
    nodeType: nodeTypeSet.NODE_TYPE_LISTENER,
    draggable: false,
    deleteForbidden: true,
    childrenAbleTypes: [],
    reactNode: CommonNode,
}

export const endConfig = {
    icon: 'endIcon',
    label: 'End',
    nodeType: nodeTypeSet.NODE_TYPE_END,
    draggable: false,
    showActions: false,
    childrenAbleTypes: [],
    nodeId: "n-000",
    configCompleteStatus: true,
    reactNode: CommonNode,
}

export default [
    // 单个节点 -----------------------------------------------------
    // Listener
    listenerConfig,
    // End
    endConfig,
    // Connector
    {
        icon: 'connectorIcon',
        label: 'Connector',
        nodeType: nodeTypeSet.NODE_TYPE_CONNECTOR,
        draggable: true,
        childrenAbleTypes: [],
        reactNode: CommonNode,
    },
    // Artemis
    {
        icon: 'mqIcon',
        label: 'Artemis',
        nodeType: nodeTypeSet.NODE_TYPE_ARTEMIS,
        draggable: true,
        childrenAbleTypes: [],
        reactNode: CommonNode,
    },
    // MQ
    {
        icon: 'mqIcon',
        label: 'MQ',
        nodeType: nodeTypeSet.NODE_TYPE_MQ,
        draggable: true,
        childrenAbleTypes: [],
        reactNode: CommonNode,
    },
    // ObjectStore
    {
        icon: 'objectStoreIcon',
        label: 'ObjectStore',
        nodeType: nodeTypeSet.NODE_TYPE_OBJECT_STORE,
        draggable: true,
        childrenAbleTypes: [],
        reactNode: CommonNode,
    },
    // Processor
    {
        icon: 'processorIcon',
        label: 'Processor',
        nodeType: nodeTypeSet.NODE_TYPE_PROCESSOR,
        draggable: true,
        childrenAbleTypes: [],
        configCompleteStatus: false,
        reactNode: CommonNode,
    },
    // Set Context
    {
        icon: 'setContextIcon',
        label: 'Set Context',
        nodeType: nodeTypeSet.NODE_TYPE_SET_CONTEXT,
        draggable: true,
        childrenAbleTypes: [],
        reactNode: CommonNode,
    },
    // Set Payload
    {
        icon: 'setPayloadIcon',
        label: 'Set Payload',
        nodeType: nodeTypeSet.NODE_TYPE_SET_PAYLOAD,
        draggable: true,
        childrenAbleTypes: [],
        reactNode: CommonNode,
    },
    // Transformer
    {
        icon: 'transformerIcon',
        label: 'Transformer',
        nodeType: nodeTypeSet.NODE_TYPE_TRANSFORMER,
        draggable: true,
        childrenAbleTypes: [],
        configCompleteStatus: true,
        reactNode: CommonNode,
    },
    // Redis
    {
        icon: 'redisIcon',
        label: 'Redis',
        nodeType: nodeTypeSet.NODE_TYPE_REDIS,
        draggable: true,
        childrenAbleTypes: [],
        reactNode: CommonNode,
    },
    // 有一组嵌套子节点 ------------------------------------------------------------------
    // Async
    {
        icon: 'asyncIcon',
        label: 'Async',
        nodeType: nodeTypeSet.NODE_TYPE_ASYNC,
        childrenAbleTypes: [nodeTypeSet.NODE_TYPE_ASYNC_CHILD],
        draggable: true,
        configCompleteStatus: true,
        reactNode: CollapseNode,
        childrenKey: "cfg.subWorkflow",
        children: [{
            nodeType: nodeTypeSet.NODE_TYPE_ASYNC_CHILD,
            draggable: false,
            configCompleteStatus: true,
            noEdge: true,
            childrenFlex: true,
            deleteForbidden: true,
            children: [],
            reactNode: ChildrenIsNeed,
        }]
    },
    // Sync
    {
        icon: 'syncIcon',
        label: 'Sync',
        nodeType: nodeTypeSet.NODE_TYPE_SYNC,
        childrenAbleTypes: [nodeTypeSet.NODE_TYPE_SYNC_CHILD],
        draggable: true,
        configCompleteStatus: true,
        reactNode: CollapseNode,
        childrenKey: "cfg.nodes",
        children: [
            {
                nodeType: nodeTypeSet.NODE_TYPE_SYNC_CHILD,
                draggable: false,
                configCompleteStatus: true,
                noEdge: true,
                childrenFlex: true,
                deleteForbidden: true,
                children: [],
                reactNode: ChildrenIsNeed
            }
        ],
    },
    // ForEach
    {
        icon: 'syncIcon',
        label: 'ForEach',
        nodeType: nodeTypeSet.NODE_TYPE_FOR_EACH,
        childrenAbleTypes: [nodeTypeSet.NODE_TYPE_FOR_EACH_CHILD],
        draggable: true,
        configCompleteStatus: false,
        reactNode: CollapseNode,
        childrenKey: "cfg.nodes",
        children: [{
            nodeType: nodeTypeSet.NODE_TYPE_FOR_EACH_CHILD,
            draggable: false,
            configCompleteStatus: true,
            noEdge: true,
            childrenFlex: true,
            deleteForbidden: true,
            children: [],
            reactNode: ChildrenIsNeed,
        }],
    },
    // 有多组嵌套子节点------------------------------------------------------------------------------------
    // Parallel
    {
        icon: 'parallelIcon',
        label: 'Parallel',
        nodeType: nodeTypeSet.NODE_TYPE_PARALLEL_AGGR,
        childrenAbleTypes: [nodeTypeSet.NODE_TYPE_PARALLEL_CHILD],
        draggable: true,
        configCompleteStatus: true,
        reactNode: CollapseNode,
        childrenKey: "cfg.parallel",
        children: [
            {
                label: 'child',
                nodeType: nodeTypeSet.NODE_TYPE_PARALLEL_CHILD,
                draggable: false,
                configCompleteStatus: true,
                noEdge: true,
                childrenFlex: true,
                deleteForbidden: true,
                children: [],
                minChildNum: 1,
                showIndex: true,
                reactNode: MultipleNode,
            }
        ],
    },
    // Choice
    {
        icon: 'choiceIcon',
        label: 'Choice',
        nodeType: nodeTypeSet.NODE_TYPE_CHOICE,
        draggable: true,
        configCompleteStatus: true,
        childrenAbleTypes: [nodeTypeSet.NODE_TYPE_CHOICE_WHEN, nodeTypeSet.NODE_TYPE_CHOICE_DEFAULT],
        reactNode: CollapseNode,
        childrenKey: "cfg.conditions",
        children: [
            {
                label: 'When',
                nodeType: nodeTypeSet.NODE_TYPE_CHOICE_WHEN,
                draggable: false,
                noEdge: true,
                childrenFlex: true,
                deleteForbidden: false,
                children: [],
                minChildNum: 2,
                showIndex: true,
                reactNode: MultipleNode,
                childrenKey: "pipeline"
            },
            {
                label: 'Defalut',
                nodeType: nodeTypeSet.NODE_TYPE_CHOICE_DEFAULT,
                draggable: false,
                configCompleteStatus: true,
                noEdge: true,
                childrenFlex: true,
                showChildAtions: 'always',
                deleteForbidden: true,
                children: [],
                reactNode: DropNode,
                childrenKey: "pipeline"
            }
        ],
    },
    // TryCatch
    {
        icon: 'tryIcon',
        label: 'TryCatch',
        nodeType: nodeTypeSet.NODE_TYPE_TRY,
        draggable: true,
        configCompleteStatus: true,
        reactNode: CollapseNode,
        childrenAbleTypes: [
            nodeTypeSet.NODE_TYPE_TRY_NORMAL,
            nodeTypeSet.NODE_TYPE_TRY_CATCH,
            nodeTypeSet.NODE_TYPE_TRY_FINALLY,
        ],
        childrenKey: "cfg.conditions",
        children: [
            {
                label: 'Normal',
                nodeType: nodeTypeSet.NODE_TYPE_TRY_NORMAL,
                draggable: false,
                configCompleteStatus: true,
                noEdge: true,
                childrenFlex: true,
                deleteForbidden: true,
                children: [],
                reactNode: ChildrenIsNeed,
                childrenKey: "pipeline"
            },
            {
                label: 'Catch',
                nodeType: nodeTypeSet.NODE_TYPE_TRY_CATCH,
                draggable: false,
                noEdge: true,
                childrenFlex: true,
                deleteForbidden: false,
                children: [],
                configCompleteStatus: true,
                minChildNum: 3,
                showIndex: true,
                startIndex: 0,
                reactNode: MultipleNode,
                childrenKey: "pipeline"
            },
            {
                label: 'Finally',
                nodeType: nodeTypeSet.NODE_TYPE_TRY_FINALLY,
                draggable: false,
                configCompleteStatus: true,
                noEdge: true,
                childrenFlex: true,
                showChildAtions: 'always',
                deleteForbidden: true,
                reactNode: DropNode,
                childrenKey: "pipeline"
            },
        ],
    }
] as Array<NodeConfig>
