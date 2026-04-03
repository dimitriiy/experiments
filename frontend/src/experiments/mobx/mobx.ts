class GloabalState {
  trackingDerivation;
}
export const gloabalState = new GloabalState();

class ObservableValue {
  _observers;
  _value;

  constructor(value) {
    this._value = value;
    this._observers = new Set();
  }

  get() {
    this.observe(gloabalState.trackingDerivation);
    return this._value;
  }

  set(value) {
    this.notify();
    this._value = value;

    return true;
  }

  observe(fn) {
    this._observers.add(fn);
  }
  notify() {
    this._observers.forEach((cb) => cb());
  }
}

class ObservableObject {
  constructor(target) {
    this._values = Object.fromEntries(Object.entries(target).map(([key, value]) => [key, new ObservableValue(value)]));
  }

  get(key) {
    return this._values[key].get();
  }

  set(prop, value) {
    return this._values[prop].set(value);
  }
}

const $$observable = Symbol();

export function observable(target) {
  Object.defineProperty(target, $$observable, {
    writeble: false,
    enumerable: false,
    value: new ObservableObject(target),
  });

  return new Proxy(target, {
    get: function (_, prop) {
      return target[$$observable].get(prop);
    },
    set: function (target, prop, value) {
      return target[$$observable].set(prop, value);
    },
  });
}
function autorun(cb) {
  let prev = gloabalState.trackingDerivation;
  gloabalState.trackingDerivation = cb;
  cb();

  gloabalState.trackingDerivation = prev;
}
