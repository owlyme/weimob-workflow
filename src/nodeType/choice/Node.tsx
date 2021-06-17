import { config as whenConfig } from './WhenNode';
import { config as defaultConfig } from './DefaultNode';
import { NodeConfig } from '../../core/types';
import {
  NODE_TYPE_CHOICE,
  NODE_TYPE_CHOICE_WHEN,
  NODE_TYPE_CHOICE_DEFAULT,
  CONFIG_KEY,
} from '../../constant';
import { CollapseNode } from "../baseNode"


const ChoiceNode = CollapseNode;
export default ChoiceNode;

export const config: NodeConfig = {
  icon: 'choiceIcon',
  label: 'Choice',
  nodeType: NODE_TYPE_CHOICE,
  draggable: true,
  configCompleteStatus: true,
  childrenAbleTypes: [NODE_TYPE_CHOICE_WHEN, NODE_TYPE_CHOICE_DEFAULT],
  [CONFIG_KEY]: {
    cfg: {
      conditions: [],
    },
  },
  children: [
    {
      ...whenConfig,
    },
    {
      ...defaultConfig,
    },
  ],
}
