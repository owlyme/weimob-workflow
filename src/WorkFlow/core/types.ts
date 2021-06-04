export enum Direction {
  H = 'Horizontal',
  V = 'vertical ',
}

export interface NodeConfig {
  nodeType: string;
  icon?: string;
  label?: string;
  children?: []; // 插入的子节点
  childrenFlex?: boolean; // 自己横向或纵向排列
  childrenAbleTypes?: [] | null; // 允许插入的子节点NodeType
  noEdge?: boolean; // 是否有后面的箭头
  showActions?: boolean; // always
  showChildAtions?: string;
  weimob_cfg?: object;
  weimobConfigSaved?: boolean;
  configCompleteStatus?: false; // 是否显示左上角红点提示
  deleteForbidden?: false;
  [propName: string]: any;
}

export interface NodeProps {
  node: NodeConfig;
  parentNode?: NodeConfig;
  nodeLevelIndex: string;
  disabled?: boolean;
  dispatch: (arg: object) => void;
  workFlow?: object;
  children?: [];
}
