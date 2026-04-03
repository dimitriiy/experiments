import React from 'react';

type InitState<T> = T | ((get: <U>(atom: Atom<U>) => U) => T);
type Subscriber = (newValue: unknown) => void;

let i = 0;

class Atom<T> {
  private value: T;
  private subscribers: Set<Subscriber> = new Set();
  private static idCounter = 0;

  private id: number = 0;

  private dependsOn = new Map<Atom<any>, () => void>();

  constructor(initState: InitState<T>) {
    this.id = Atom.idCounter++;

    if (typeof initState === 'function') {
      this.value = this.computeDerivedValue(initState);
    } else {
      this.value = initState;
    }
  }

  computeDerivedValue(computedFn: (getter: (atom: Atom<T>) => Atom<T>) => Atom<T>) {
    this.dependsOn.forEach((cb) => cb());
    this.dependsOn.clear();

    const get = <T>(atom: Atom<T>) => {
      if (!this.dependsOn.has(atom)) {
        let unsubscribe = atom.subscribe(() => {
          const neValue = computedFn(get);
          if (neValue === this.value) return;

          this.value = neValue;
          this.notify(neValue);
        });
        this.dependsOn.set(atom, unsubscribe);
      }

      return atom.get();
    };

    return computedFn(get);
  }

  get(): T {
    return this.value;
  }

  set(value: T): void {
    if (this.value === value) return;
    this.value = value;

    this.notify(value);
  }

  notify(newValue: T) {
    this.subscribers.forEach((cb) => cb(newValue));
  }

  subscribe(fn: Subscriber) {
    this.subscribers.add(fn);

    return () => {
      this.subscribers.delete(fn);
    };
  }
}

export const createAtom = <T>(value: InitState<T>) => new Atom(value);

export function useAtom<T>(atom: Atom<T>) {
  const [value, setValue] = React.useState(atom.get());

  React.useEffect(() => {
    let unsubscribe = atom.subscribe(setValue);

    return () => unsubscribe();
  }, [atom]);

  const onChange = (value: T) => {
    atom.set(value);
  };

  return [value, onChange];
}

export function useAtomValue<T>(atom: Atom<T>) {
  const [value, setValue] = React.useState(atom.get());

  React.useEffect(() => {
    let unsubscribe = atom.subscribe(setValue);

    return () => unsubscribe();
  }, [atom]);

  return value;
}
