import React from 'react';
import { EventInstance, Store, Watcher } from './types';

export const createStore = <T,>(initialValue: T): Store<T> => {
  let store = initialValue;

  let events = new Map();
  let watchers: Watcher<T>[] = [];

  return {
    getStore: () => store,
    on: function (event: EventInstance<T>, callback: (value: T, payload: any) => T) {
      events.set(event, callback);
      event.stores.push(this);

      return this;
    },

    dispatch: function (event, payload) {
      if (!events.has(event)) return;

      const cb = events.get(event);
      const newStore = cb(store, payload);
      if (newStore !== store) {
        store = newStore;
      }

      watchers.forEach((watch) => watch(store, payload));
    },

    watch(cb: Watcher<T>) {
      watchers.push(cb);
      // Return function to unsubscribe the watcher
      return () => {
        watchers = watchers.filter((i) => i !== cb);
      };
    },
  };
};

export const createEvent = <T,>() => {
  const event = (payload: T) => {
    event?.stores?.forEach((store) => store.dispatch(event, payload));
  };
  event.stores = [];

  return event;
};

export function useStore<T>(store: Store<T>) {
  const [state, setState] = React.useState(store.getStore());

  React.useEffect(() => {
    const disposer = store.watch(setState);

    return disposer;
  }, []);

  return state;
}
