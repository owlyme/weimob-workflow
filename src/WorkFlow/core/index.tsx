import storeInstance, { connect } from './store';

export { default as Palette } from './palette';
export { AddBtnOnline } from './addBtn';
export { default as NodeActions } from './nodeActions';

export { default as DropContainer } from './dropContainer';
export { default as CollapseContainer } from './collapseContainer';
export { default as IconCom } from './images/icons';
export { setDragImage, childDisable } from './utils';
export { parseIndex, getWorkFlowNodes } from './store/utils';

export const store = storeInstance;
export const workFlowConnect = connect;
