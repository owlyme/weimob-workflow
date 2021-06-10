import {
    createWorkflowStore,
    Palette,
    paletteUseNode,
  } from './core';
  import Tools from './toolbars';
  import Form from './nodeType/NodeForm';
  import Node from './nodeType';
  
  paletteUseNode(Node);
  const [storeInstance, workFlowConnect] = createWorkflowStore();
  export const store = storeInstance;
  export const WorkFlowPalette = workFlowConnect(Palette);
  export const Toolbar = workFlowConnect(Tools);
  export const NodeForm = workFlowConnect(Form);
  