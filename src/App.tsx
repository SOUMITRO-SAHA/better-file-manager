import * as React from "react";
import AppLayout from "./components/layouts/app-layout";
import { Button } from "./components/ui/button";
import useSystem from "./hooks/useSystem";
import { formatBytes } from "./lib/utils/system";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { disks, formatDiskSize } = useSystem();

  return (
    <AppLayout>
      <h1 className="text-3xl">Hello World!!!</h1>
      <Button>Get Disk Info</Button>
      <div className="my-6 flex flex-col gap-10">
        {disks?.map((disk) => {
          return (
            <div key={disk.mountPoint}>
              <p>Name: {disk.name}</p>
              <p>Size: {disk.mountPoint}</p>
              <p>Size: {formatBytes(Number(disk.availableSpace))}</p>
              <p>Size: {formatBytes(Number(disk.totalSpace))}</p>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default App;
