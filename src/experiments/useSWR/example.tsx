import React from 'react';
import { useSWR } from './useSWR';

const fetcher = async () => new Promise<number[]>((res) => setTimeout(() => res([1, 2, 3]), 3000));

export function SWRApp() {
  const { data, error } = useSWR('/api', fetcher);

  if (error) return <div>failed</div>;
  if (!data) return <div>loading...</div>;

  return (
    <ul>
      {data.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}
