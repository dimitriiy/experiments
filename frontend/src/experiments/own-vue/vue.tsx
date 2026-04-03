import { reactive } from './reactive';

function call(expr, ctx) {
  return new Function(`with(this){${`return ${expr}`}}`).bind(ctx)();
}
const data = { a: 1, c: 2 };

console.log('cal', call('(a+c)*2', data));

const directives = {
  on: (el, name, value, ctx) => (el[`on${name}`] = () => call(value, ctx)),
  text: (el, name, value, ctx) => (el.innerHTML = call(value, ctx)),
};

let effect = null;

function walk(node, data) {
  for (const { name, value } of node.attributes) {
    if (!name.startsWith('q-')) return;

    const [directive, valueDirective] = name.substring(2).split(':');
    const handler = directives[directive];
    console.log(handler, node);
    handler(node, valueDirective, value, data);
  }

  for (const child of node.children) {
    walk(child, data);
  }
}

export function Q(node, data) {
  walk(node, reactive(data));
}
