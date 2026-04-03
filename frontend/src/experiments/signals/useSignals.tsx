import React from 'react';
import { createEffect, type Setter, type Signal } from './signals';

function useRender() {
  const [_, setValue] = React.useState(0);

  return React.useCallback(() => setValue((prev) => prev + 1), []);
}

export function useStore<T>(signal: Signal<T>): [T, Setter<T>] {
  const signalRef = React.useRef(signal);
  const reRender = useRender();

  React.useEffect(() => {
    const unsibscribe = signalRef.current.subscribe(reRender);

    return unsibscribe;
  }, [reRender]);

  return [signalRef.current.get(), signalRef.current.set.bind(signalRef.current)];
}

export function useComputed(fn: () => any) {
  const [value, setValue] = React.useState(fn);

  React.useEffect(() => {
    const effect = () => setValue(fn());

    createEffect(effect);
  }, [fn]);

  return value;
}
