import React, { useState, useEffect } from 'react';
import createDataStore from './storeData';


export default function () {
  const storeInstance = createDataStore();

  function connect(Comp: any) {
    return function Conncet(props: any) {
      const [workFlow, setWorkFlow] = useState<any>(storeInstance.getState());

      useEffect(() => {
        storeInstance.subscribe(() => {
          setWorkFlow(storeInstance.getState());
        });
        return () => {
          storeInstance.reset()
        }
      }, []);

      return <Comp
          {...props}
          workFlow={workFlow}
          dispatch={storeInstance.dispatch}
          subscribe={storeInstance.subscribe}
        />
    };
  }

  return [storeInstance, connect] as const;
}
