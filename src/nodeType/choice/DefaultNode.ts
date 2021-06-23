import { NODE_TYPE_CHOICE_DEFAULT } from '../../constant';
import { NodeConfig } from '../../core/types';
import { DropNode } from "../baseNode"

const createConfig = (): NodeConfig => ({
  label: 'Defalut',
  nodeType: NODE_TYPE_CHOICE_DEFAULT,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  
  showChildAtions: 'always',
  deleteForbidden: true,
  children: [],
});

const Default = DropNode;
export default Default

export const config = createConfig();
