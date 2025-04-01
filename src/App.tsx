import "@/lib/configs";
import * as React from "react";
import Workspace from "./components/custom/workspace/workspace";
import SettingsDialog from "./components/dialogs/settings/settings";
import AppLayout from "./components/layouts/app-layout";
import { TooltipProvider } from "./components/ui/tooltip";
import { setUpMenu } from "@/lib/configs";
import { useAppStore } from "./lib/store/appStore";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  // -- Store
  const { activeWindowIndex } = useAppStore();
  console.log("Active Window", activeWindowIndex);

  // --- Effects
  React.useEffect(() => {
    // Initialize app state
    setUpMenu();
  }, []);

  return (
    <TooltipProvider>
      {/* Default Screen */}
      <AppLayout>
        <Workspace />
      </AppLayout>

      {/* Settings Modal */}
      <SettingsDialog />
    </TooltipProvider>
  );
};

export default App;
