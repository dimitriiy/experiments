// https://habr.com/ru/companies/deliveryclub/articles/664506/

let currentEffect = null;
const targetMap = new WeakMap();

function effect(fn) {
  currentEffect = fn;
  currentEffect();
  currentEffect = null;
}

function track(target, key) {
  let depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let depsEffects = depsMap.get(key);

  if (!depsEffects) {
    depsMap.set(key, (depsEffects = new Set()));
  }
  depsEffects.add(currentEffect);
}

function trigger(target, key) {
  let deps = targetMap.get(target)?.get(key);

  if (!deps) return;

  deps.forEach((fn) => fn?.());
}

export function reactive(target) {
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);

      return Reflect.get(target, key, receiver);
    },

    set(target, key, value, receiver) {
      const d = Reflect.set(target, key, value, receiver); // (2)

      const oldValue = target[key];
      d && oldValue !== value && trigger(target, key);

      return d;
    },
  });

  return proxy;
}

let totalCount = 0;

let items = reactive({
  store1: 3,
  store2: 4,
});

effect(() => {
  totalCount = items.store1 + items.store2;
});

items.store1 = 44; // устанавливаем новое значение
console.log(totalCount, 'should', 48); // 48
items.store2 = 24; // устанавливаем новое значение для второго поля
console.log(totalCount, 'should', 68); //68
