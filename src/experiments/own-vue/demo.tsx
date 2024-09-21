import React from 'react';
import { Observable, computed, create, El } from './vue-2';

function run() {
  const inputValue = new Observable('text');
  const isDisabled = new Observable(false);

  const b = computed(() => {
    if (isDisabled.get()) {
      return inputValue.get() + ' ' + inputValue.get();
    } else {
      return 'c is turned off';
    }
  });

  const input = create('input').bind('value', inputValue);
  const h1 = create('h1').bind('innerText', b);
  const button = create('button')
    .bind('innerText', () => {
      //   console.log("lolol", isDisabled.get() ? "On" : "Off");

      return isDisabled.get() ? 'On' : 'Off';
    })
    .on('click', () => {
      isDisabled.set(!isDisabled.get());
    });

  const root = document.getElementById('content');
  root.innerHTML = '';
  const rootEl = new El(root);
  rootEl.append(input).append(h1).append(button);
}
export function VueDemo() {
  React.useEffect(() => {
    run();
  }, []);

  return <div id="content"></div>;
}
