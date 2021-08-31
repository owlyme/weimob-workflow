# weimob-workflow

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/weimob-workflow.svg)](https://www.npmjs.com/package/weimob-workflow) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save weimob-workflow
```

## Usage

```tsx
import {
  createWorkflowStore,
  paletteHOC,
  initState,
  addListenerNode,
  CONFIG_KEY,
  nodeTypeSet,
  matchProperty,
  NodeChildKeyFields,
} from 'weimob-workflow';
import 'weimob-workflow/dist/index.css';

const [storeInstance, workFlowConnect] = createWorkflowStore();
const workFlowStore = storeInstance;
const WorkFlowPalette = workFlowConnect(paletteHOC());

class Example extends Component {
  render() {
    return <WorkFlowPalette />
  }
}
```

## License

MIT © [](https://github.com/)
