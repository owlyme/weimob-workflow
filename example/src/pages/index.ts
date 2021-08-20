import { createWorkflowStore, Node, paletteHOC } from 'weimob-workflow';
import 'weimob-workflow/dist/index.css';
import Tools from './toolbars';

const [storeInstance, workFlowConnect] = createWorkflowStore();
export const workFlowStore = storeInstance;
export const Toolbar = workFlowConnect(Tools);
export const WorkFlowPalette = workFlowConnect(paletteHOC(Node));

export const setWorkFlowNodes = (data) => {
    storeInstance.dispatch({
        type: "workflow/setWorkFlowNodes",
        payload: data
    })
}
export const getWorkFlowNodes = () => {
    return storeInstance.getState().workFlowNodes
}


