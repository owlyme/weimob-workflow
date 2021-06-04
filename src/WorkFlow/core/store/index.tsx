import React, { useState, useEffect } from 'react';
import createDataStore from './storeData';

const storeInstance = createDataStore();

export function connect(Comp:React.ElementType, extraProps = {}) {
  return function Conncet(props:any) {
    const [workFlow, setWorkFlow] = useState(storeInstance.getState());
    useEffect(() => {
      storeInstance.subscribe(() => {
        setWorkFlow(storeInstance.getState());
      });
    }, [setWorkFlow]);

    return (
      <Comp
        {...props}
        {...extraProps}
        workFlow={workFlow}
        dispatch={storeInstance.dispatch}
      />
    );
  };
}

export default storeInstance;
