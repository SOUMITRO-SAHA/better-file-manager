import * as React from "react";
import AppLayout from "./components/layouts/app-layout";
import { Button } from "./components/ui/button";

interface AppProps {}

const App: React.FC<AppProps> = () => {
    return (
        <AppLayout>
            <h1 className="text-3xl">Hello World!!!</h1>
            <Button>Get Disk Info</Button>
        </AppLayout>
    );
};

export default App;
