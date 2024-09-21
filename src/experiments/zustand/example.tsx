import * as React from 'react';
import { useStore } from './own-zustand';

export function Zustand() {
  const value = useStore((state) => state.value);

  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div className="App">
      <h1>{value}</h1>
      <button onClick={increment}>Increment </button>
      <button onClick={decrement}>Decrement </button>
      <hr />
      <Arr />
    </div>
  );
}

const Arr = React.memo(() => {
  const array = useStore((state) => state.array);
  const add = useStore((state) => state.add);
  console.log('render B');

  return (
    <div>
      <div>
        <button onClick={add}>Add </button>
      </div>
      {JSON.stringify(array, null, 2)}
    </div>
  );
});
