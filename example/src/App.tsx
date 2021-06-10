import React from 'react'

import { parseIndex } from 'weimob-workflow'
import 'weimob-workflow/dist/index.css'

const App = () => {
  return <div>
    {parseIndex(123)}
  </div>
}

export default App
