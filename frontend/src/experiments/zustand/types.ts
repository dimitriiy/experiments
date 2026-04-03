export type Listener<T> = (old: T, newState: T) => void;

export type SetState<T> = (partial: T | ((state: T) => T)) => void;

export type API<T> = {
  setState: SetState<T>;
  getState: () => T;
  subscribe: (l: Listener<T>) => void;
  destroy: () => void;
};

export type InitFunc<T> = (a: API<T>['setState'], b: API<T>['getState'], api: API<T>) => T;
