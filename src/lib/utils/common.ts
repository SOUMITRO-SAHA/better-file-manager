import { FileViewOptionType, useAppStore } from "../store/appStore";

export const toggleSplitView = (display: boolean) => {
  const appStore = useAppStore.getState();
  appStore.setToggleSplitView(display);
};

export const changeFileViewOption = (view: FileViewOptionType) => {
  const appStore = useAppStore.getState();
  appStore.setFileViewOption(view);
};
