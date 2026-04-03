import * as React from 'react';
import { createStore } from './createStore';
//https://rohitpotato.hashnode.dev/build-your-own-zustand

export const useStore = createStore((set, get) => ({
  value: 0,
  array: [],
  add: () =>
    set((state) => ({
      ...state,
      array: [...state.array, state.array.length + 1],
    })),
  increment: () => set((state) => ({ ...state, value: state.value + 1 })),
  decrement: () => set((state) => ({ ...state, value: state.value - 1 })),
}));
