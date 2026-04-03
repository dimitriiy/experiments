import * as React from 'react';
import { create } from './create';
import { InitFunc } from './types';
//https://rohitpotato.hashnode.dev/build-your-own-zustand

export function createStore<T>(initState: InitFunc<T>) {
  const api = typeof initState === 'function' ? create(initState) : initState;

  function useStore(selector) {
    const [, forceRender] = React.useReducer((c) => c + 1, 0);
    const divorce = React.useRef();

    React.useEffect(() => {
      divorce.current = api.subscribe(forceRender);
      return () => {
        divorce.current?.();
      };
    }, []);
    const selectedState = selector(api.getState());

    return selectedState;
  }

  return useStore;
}
