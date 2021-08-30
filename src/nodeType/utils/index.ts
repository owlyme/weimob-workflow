import { NodeConfig } from '../../core/types';

export function createComponentsandConfigSet(configs: Array<NodeConfig>) {
  return configs.reduce((acc, nodeItem) => {
    const { reactNode, ...config } = nodeItem;
    let ChildComponents = {}
    let ChildConfigs = {}
    if (config.children?.length) {
      [ChildComponents, ChildConfigs] = createComponentsandConfigSet(config.children)
    }
    return [
      {
        ...acc[0],
        [config.nodeType]: reactNode,
        ...ChildComponents
      },
      {
        ...acc[1],
        [config.nodeType]: config,
        ...ChildConfigs
      }
    ]
  }, [{}, {}]);
}

export function matchProperty(data:object, key: string, value: any) {
  if (!key) {
    data = value
    return 
  }
  const levelKey = key.split(".");
  let val = data;
  levelKey.forEach((key: string, index: number) => {
    if (index == levelKey.length -1) {
      val[key] = value
    } else {
      val = data[key]
    }
  });
}