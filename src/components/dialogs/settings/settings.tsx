import { useAppStore } from "@/lib/store/appStore";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralTab from "./tabs/general-tab";
import TagsTab from "./tabs/tags-tab";
import AdvancedTab from "./tabs/advanced-tab";

interface SettingsDialogProps {}

const SettingsDialog: React.FC<SettingsDialogProps> = (props) => {
  const { showSettings, setToggleShowSettings } = useAppStore();

  return (
    <Dialog
      defaultOpen={showSettings}
      open={showSettings}
      onOpenChange={() => {
        setToggleShowSettings();
      }}
      {...props}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Better Settings</DialogTitle>
          <DialogDescription asChild>
            <Tabs defaultValue="general" className="w-full">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="tags">Tags</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <GeneralTab />
              </TabsContent>
              <TabsContent value="tags">
                <TagsTab />
              </TabsContent>
              <TabsContent value="advanced">
                <AdvancedTab />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
