export type Getter<T> = () => T;
export type Setter<T> = (value: T) => void;

export type Effect = () => void;

let globalEffect: Sibscriber | null = null;

type Sibscriber = () => void;

export class Signal<T> {
  private value: T;

  private subscribers = new Set<Sibscriber>();

  constructor(value: T) {
    this.value = value;
  }

  has(fn: Sibscriber) {
    return this.subscribers.has(fn);
  }

  get() {
    if (!this.has(globalEffect as Sibscriber) && globalEffect) {
      this.subscribe(globalEffect);
    }

    return this.value;
  }

  set(newValue: T) {
    if (Object.is(this.value, newValue)) return;

    this.value = newValue;

    this.emit();
  }

  subscribe(fn: Sibscriber) {
    this.subscribers.add(fn);

    return () => this.unsubscribe(fn);
  }

  unsubscribe(fn: Sibscriber) {
    if (this.has(fn)) {
      this.subscribers.delete(fn);
    }
  }

  emit() {
    this.subscribers.forEach((subscriber) => subscriber());
  }
}

export const createSignal = <T>(value: T) => {
  return new Signal(value);
};

export const createEffect = (fn: Effect) => {
  globalEffect = fn;

  fn();

  globalEffect = null;
};
