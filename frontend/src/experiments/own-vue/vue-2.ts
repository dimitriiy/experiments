let computedFunc: () => void | null = null;
//https://jsfiddle.net/kasheftin/f2j1ecu5/1/
type Watcher<T, R = any> = (arg: T) => R;

export class Observable<T = any> {
  constructor(
    private value: T,
    private watchers: Watcher<T>[] = []
  ) {}

  get() {
    if (computedFunc) {
      this.watchers.push(computedFunc);
    }
    return this.value;
  }

  set(newValue: T) {
    this.value = newValue;

    console.log('set', newValue, this.watchers);
    this.watchers.forEach((w) => w(newValue));
    return this;
  }

  watch(watcher: Watcher<T>) {
    if (this.watchers.includes(watcher)) return;

    this.watchers.push(watcher);
  }
}

export function computed(action) {
  const observer = new Observable(null);

  const effect = () => {
    // const prevComputedFunc = computedFunc;

    computedFunc = effect;
    observer.set(action());
    computedFunc = null;
  };

  effect();
  return observer;
}

export class El {
  constructor(private node: Node) {}

  bind(prop: keyof Node | 'value', observerOrFn: Observable | Function) {
    const observable = observerOrFn instanceof Observable ? observerOrFn : computed(observerOrFn);

    if (prop === 'value') {
      this.on('input', (e: any) => {
        console.log('input', observerOrFn, e.target.value);
        return observerOrFn.set(e.target.value);
      });
    }

    observable.watch((value) => {
      console.log('here', value);
      this.node[prop] = value;
    });
    prop === 'innerText' && console.log(observable);

    this.node[prop] = observable.get();
    return this;
  }

  on(type, fn) {
    this.node.addEventListener(type, fn);

    return this;
  }
  append(node) {
    if (node instanceof El) {
      this.node.appendChild(node.node);
    }

    return this;
  }
}

export function create(selector) {
  const el = document.createElement(selector);
  return new El(el);
}
