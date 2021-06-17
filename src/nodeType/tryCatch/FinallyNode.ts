import { NODE_TYPE_TRY_FINALLY, CONFIG_KEY } from '../../constant';
import { NodeConfig } from '../../core/types';
import { DropNode } from "../baseNode"

const createConfig = (): NodeConfig => ({
  label: 'Finally',
  nodeType: NODE_TYPE_TRY_FINALLY,
  draggable: false,
  configCompleteStatus: true,
  noEdge: true,
  childrenFlex: true,
  showChildAtions: 'always',
  deleteForbidden: true,
  [CONFIG_KEY]: { conditionType: 'finally' },
  children: [
    // {
    //   ...NodePlaceholderConfig,
    // },
  ],
});
const Finally = DropNode;
export default Finally

export const config = createConfig();
