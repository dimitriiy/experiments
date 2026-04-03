import { InitFunc, Listener } from './types';

export function create<T>(initStore: InitFunc<T>) {
  let state: T = {} as T;
  const listeners = new Set<Listener<T>>();

  const setState = (partial: T | ((state: T) => T)) => {
    const newState = typeof partial === 'function' ? partial(state) : partial;

    if (newState !== state) {
      state = newState;
      listeners.forEach((listener) => listener(state, newState));
    }
  };

  const getState = () => state;
  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };
  const destroy = () => {};

  const api = {
    setState,
    getState,
    subscribe,
    destroy,
  };

  state = initStore(setState, getState, api);

  return api;
}
