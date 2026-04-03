import React from "react";

import { SWRApp } from "./experiments/useSWR/example";
import { Counter } from "./experiments/own-effector/example";
import { Zustand } from "./experiments/zustand/example";
import { VueDemo } from "./experiments/own-vue/demo";
import { TypingEffect } from "./experiments/typing-effect";
import { Anim } from "./experiments/transition";
import { MobxApp } from "./experiments/mobx/case";
import { createHashRouter } from "react-router-dom";
import { Signals } from "./experiments/signals";
import { LongTasks } from "./experiments/longTasks";
import { AtomApp } from "./experiments/atom";
import { MyRouterApp } from "./experiments/react-router";
import { Main } from "./pages/main";
import { DISandbox } from "./experiments/di/sandbox";
import { MyReactQueryApp } from "./experiments/react-query/sandbox";

export const PAGES = [
  "my-react-query",
  "my-router",
  "atom",
  "long-tasks",
  "Signals",
  "SWRApp",
  "own-effector",
  "own-zustand",
  "own-vue",
  "own-mobx",
  "typing-effect",
  "transition",
];

const Layout = ({ children }) => <div className="p-4">{children}</div>;
export const router = createHashRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Main />
      </Layout>
    ),
  },
  {
    path: "/react-query",
    element: (
      <Layout>
        <MyReactQueryApp />
      </Layout>
    ),
  },
  {
    path: "/my-di",
    element: (
      <Layout>
        <DISandbox />
      </Layout>
    ),
  },
  {
    path: "/my-router",
    element: (
      <Layout>
        <MyRouterApp />
      </Layout>
    ),
  },

  {
    path: "/atom",
    element: (
      <Layout>
        <AtomApp />
      </Layout>
    ),
  },

  {
    path: "/long-tasks",
    element: (
      <Layout>
        <LongTasks />
      </Layout>
    ),
  },
  {
    path: "/signals",
    element: (
      <Layout>
        <Signals />
      </Layout>
    ),
  },

  {
    path: "/SWRApp",
    element: (
      <Layout>
        <SWRApp />
      </Layout>
    ),
  },
  {
    path: "/own-effector",
    element: (
      <Layout>
        <Counter />
      </Layout>
    ),
  },
  {
    path: "/own-zustand",
    element: (
      <Layout>
        <Zustand />
      </Layout>
    ),
  },
  {
    path: "/own-vue",
    element: (
      <Layout>
        <VueDemo />
      </Layout>
    ),
  },
  {
    path: "/own-mobx",
    element: (
      <Layout>
        <MobxApp />
      </Layout>
    ),
  },
  {
    path: "/typing-effect",
    element: (
      <Layout>
        <TypingEffect />
      </Layout>
    ),
  },
  {
    path: "/transition",
    element: (
      <Layout>
        <Anim />
      </Layout>
    ),
  },
]);
