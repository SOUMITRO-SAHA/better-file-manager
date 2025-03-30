import * as React from "react";
import Workspace from "./components/custom/workspace/workspace";
import AppLayout from "./components/layouts/app-layout";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <AppLayout>
      <Workspace />
    </AppLayout>
  );
};

export default App;
