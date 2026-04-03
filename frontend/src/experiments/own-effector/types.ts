export type Store<T> = {
  getStore: () => T;
  on: (event: EventInstance<T>, callback: (store: T, payload: any) => T) => Store<T>;
  dispatch: (event: Function, payload: any) => void;
  watch: (cb: Watcher<T>) => () => void;
};

export type EventInstance<T> = (value?: T) => void;

export type Watcher<T> = (store: T) => void;
