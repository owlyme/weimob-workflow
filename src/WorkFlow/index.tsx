import { store as storeInstance, workFlowConnect, Palette } from './core';
import Tools from './toolbars';
import Form from './nodeType/NodeForm';
import Node from './nodeType';

export const store = storeInstance;

export const WorkFlowPalette = workFlowConnect(Palette, { Node: Node });
export const Toolbar = workFlowConnect(Tools);
export const NodeForm = workFlowConnect(Form);
