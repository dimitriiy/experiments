import { screen } from '@testing-library/dom';
import { useSWR } from '../useSWR';
import React from 'react';
import ReactDOM from 'react-dom';

const fetcher = () =>
  new Promise<{ name: string }>((resolve) => {
    setTimeout(
      () =>
        resolve({
          name: 'BFE.dev',
        }),
      500
    );
  });

describe('useSWR', () => {
  it('when promise resolves  ', async () => {
    const $root = document.querySelector('#root');

    function App() {
      const { data, error } = useSWR('/api', fetcher);
      console.log('render', data, error);
    }

    ReactDOM.render(<App />, $root);
  });
});
