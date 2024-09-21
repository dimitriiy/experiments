import React from 'react';
import { createEvent, createStore, useStore } from './own-effector';

type Type = number;
export const $counter = createStore<Type>(0);

export const inc = createEvent<Type>();
export const dec = createEvent<Type>();
export const reset = createEvent();

$counter
  .on(inc, (state) => state + 1)
  .on(dec, (state) => state - 1)
  .on(reset, () => 0);

export const Counter = () => {
  const total = useStore($counter);

  return (
    <div>
      <p>
        Total: <b>{total}</b>
      </p>
      <button style={{ background: 'red' }} onClick={() => dec()}>
        -
      </button>
      <button style={{ background: '#ccc' }} onClick={reset}>
        Reset
      </button>
      <button style={{ background: 'green' }} onClick={() => inc()}>
        +
      </button>
    </div>
  );
};
