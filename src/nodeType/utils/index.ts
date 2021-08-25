import {  NodeConfig } from '../../core/types';
export function createComponentsandConfigSet(configs: Array<NodeConfig>) {
    return configs.reduce((acc, nodeItem) => {
      const {reactNode, ...config} = nodeItem;
      let ChildComponents = {}
      let ChildConfigs = {}
      if (config.children?.length) {
        [ ChildComponents, ChildConfigs ] = createComponentsandConfigSet(config.children)
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
  