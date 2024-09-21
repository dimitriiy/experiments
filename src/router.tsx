import React from 'react';

import { Layout } from './Layout';
import { SWRApp } from './experiments/useSWR/example';
import { Counter } from './experiments/own-effector/example';
import { Zustand } from './experiments/zustand/example';
import { VueDemo } from './experiments/own-vue/demo';
import { TypingEffect } from './experiments/typing-effect';
import { Anim } from './experiments/transition';
import { MobxApp } from './experiments/mobx/case';
import { createBrowserRouter } from 'react-router-dom';

export const PAGES = ['SWRApp', 'own-effector', 'own-zustand', 'own-vue', 'own-mobx', 'typing-effect', 'transition'];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout>Main</Layout>,
  },
  {
    path: '/SWRApp',
    element: (
      <Layout>
        <SWRApp />
      </Layout>
    ),
  },
  {
    path: '/own-effector',
    element: (
      <Layout>
        <Counter />
      </Layout>
    ),
  },
  {
    path: '/own-zustand',
    element: (
      <Layout>
        <Zustand />
      </Layout>
    ),
  },
  {
    path: '/own-vue',
    element: (
      <Layout>
        <VueDemo />
      </Layout>
    ),
  },
  {
    path: '/own-mobx',
    element: (
      <Layout>
        <MobxApp />
      </Layout>
    ),
  },
  {
    path: '/typing-effect',
    element: (
      <Layout>
        <TypingEffect />
      </Layout>
    ),
  },
  {
    path: '/transition',
    element: (
      <Layout>
        <Anim />
      </Layout>
    ),
  },
]);
