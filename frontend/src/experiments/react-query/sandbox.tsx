import { CodeLoader } from "@/components/CodeLoader";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

import { QueryClient, QueryClientProvider, useMySuspenseQuery } from "./lib";
import React from "react";

export function MyReactQueryApp() {
  return (
    <>
      <Card>
        <CardContent>
          <App />
        </CardContent>
      </Card>
      <CodeLoader component="react-query" />
    </>
  );
}

const api = (): Promise<{ num: number }> =>
  new Promise((res) =>
    setTimeout(() => res({ num: Math.floor(Math.random() * 10000) }), 1000),
  );

const User = () => {
  const { data, refetch } = useMySuspenseQuery({
    queryKey: ["stgb"],
    queryFn: api,
  });

  return (
    <div>
      <button onClick={() => refetch()}>User {data.num}</button>
    </div>
  );
};

const Settings = () => {
  const { data, refetch } = useMySuspenseQuery({
    queryKey: ["stgb"],
    queryFn: api,
  });

  return (
    <div style={{ padding: "10px 0" }}>
      <button onClick={() => refetch()}>User {data.num}</button>
    </div>
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider queryClient={queryClient}>
      <React.Suspense fallback={<Loader />}>
        <User />
      </React.Suspense>
      <React.Suspense fallback={<Loader />}>
        <Settings />
      </React.Suspense>
    </QueryClientProvider>
  );
}
