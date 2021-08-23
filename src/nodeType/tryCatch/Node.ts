import { config as normalConfig } from './NormalNode';
import { config as catchConfig } from './CatchNode';
import { config as finallyConfig } from './FinallyNode';
import {
  NODE_TYPE_TRY,
  NODE_TYPE_TRY_NORMAL,
  NODE_TYPE_TRY_CATCH,
  NODE_TYPE_TRY_FINALLY,
} from '../../constant';

import { CollapseNode } from "../baseNode";

const TryCatchNode = CollapseNode;

export default TryCatchNode;

export const config = {
  icon: 'tryIcon',
  label: 'TryCatch',
  nodeType: NODE_TYPE_TRY,
  draggable: true,
  configCompleteStatus: true,
  childrenAbleTypes: [
    NODE_TYPE_TRY_NORMAL,
    NODE_TYPE_TRY_CATCH,
    NODE_TYPE_TRY_FINALLY,
  ],

  children: [
    {
      ...normalConfig,
    },
    {
      ...catchConfig,
    },
    {
      ...finallyConfig
    },
  ],
}
