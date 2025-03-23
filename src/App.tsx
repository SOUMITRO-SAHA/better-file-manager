import * as React from "react";
import AppLayout from "./components/layouts/app-layout";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <AppLayout>
      <h1 className="text-3xl bg-red-500">Hello World!!!</h1>
    </AppLayout>
  );
};

export default App;
