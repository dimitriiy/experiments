import React from 'react';
import { observable } from './mobx';
import { observer } from './react-mobx';

const counterObject = observable({ counter: 1, data: 0 });

function Counter() {
  console.log('render Counter');

  return (
    <div>
      <button onClick={() => counterObject.counter--}>-</button>
      {counterObject.counter}
      <button onClick={() => counterObject.counter++}>+</button>
    </div>
  );
}

function Arr() {
  console.log('render Arr');
  React.useEffect(() => {
    setTimeout(() => {
      // counterObject.data = 10
    }, 3000);
  }, []);

  if (!counterObject.data) return 'empty';

  return (
    <div>
      <ul>
        {Array.from({ length: counterObject.data }, (_, i) => i).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export const Mobx = observer(Counter);
export const MobxArr = observer(Arr);

export const MobxApp = () => {
  return (
    <div>
      <Mobx />
      <MobxArr />
    </div>
  );
};
