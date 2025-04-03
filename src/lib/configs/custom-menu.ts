import { emit } from "@tauri-apps/api/event";
import { relaunch } from "@tauri-apps/plugin-process";
import { Menu, PredefinedMenuItem, Submenu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useAppStore } from "../store/appStore";
import { changeFileViewOption, toggleSplitView } from "../utils/common";

export async function setUpMenu() {
  const separator = await PredefinedMenuItem.new({
    text: "separator-text",
    item: "Separator",
  });

  const appMenu = await Submenu.new({
    id: "better",
    text: "Better",
    items: [
      {
        id: "about_better",
        text: "About Better...",
        action: () => {
          console.log("About better file manager!!!");
        },
      },
      {
        id: "check_update",
        text: "Check for Update",
        action: () => {
          console.log("Check for Update!!!");
        },
      },
      separator,
      {
        id: "hide_better",
        text: "Hide Better",
        accelerator: "CmdOrCtrl+H",
        action: async () => {
          await getCurrentWindow().minimize();
        },
      },
      {
        id: "hide_others",
        text: "Hide Others",
        accelerator: "Alt+CmdOrCtrl+H",
        action: async () => {
          // This is working automatically, We have to check whether it is working on all the Platforms
          // I am using macOS
        },
      },
      separator,
      {
        id: "settings",
        text: "Settings",
        accelerator: "CmdOrCtrl+,",
        action: () => {
          console.log("Check for Settings!!!");

          const appStore = useAppStore.getState();
          appStore.setToggleShowSettings();
        },
      },
      {
        id: "quit",
        text: "Quit",
        accelerator: "CmdOrCtrl+Q",
        action: async () => {
          await getCurrentWindow().close();
        },
      },
    ],
    enabled: true,
  });

  const fileMenu = await Submenu.new({
    id: "file",
    text: "File",
    items: [
      {
        id: "new_better_window",
        text: "New Better Window",
        accelerator: "CmdOrCtrl+N",
        action: () => {
          console.log("Clicked new Better Window");
        },
      },
      {
        id: "new_folder",
        text: "New Folder",
        accelerator: "Shift+CmdOrCtrl+N",
        action: () => {
          console.log("Clicked New Folder");
        },
      },
      {
        id: "split_window",
        text: "Split Window",
        accelerator: "Shift+CmdOrCtrl+I",
        action: () => {
          toggleSplitView(true);
        },
      },
      {
        id: "close_split_window",
        text: "Close Split Window",
        accelerator: "CmdOrCtrl+Ctrl+Shift+I",
        action: () => {
          toggleSplitView(false);
        },
      },
      separator,
      {
        id: "find",
        text: "Find",
        accelerator: "CmdOrCtrl+F",
        action: async () => {
          console.log("Clicked Find");
          await emit("focus-searchbar", {});
        },
      },
    ],
  });

  const editMenu = await Submenu.new({
    id: "edit",
    text: "Edit",
    items: [
      {
        id: "undo",
        text: "Undo",
        accelerator: "CmdOrCtrl+Z",
        action: () => {
          console.log("Undo clicked!!!");
        },
      },
      {
        id: "redo",
        text: "Redo",
        accelerator: "CmdOrCtrl+Shift+Z",
        enabled: false,
        action: () => {
          console.log("Redo clicked!!!");
        },
      },
      separator,
      {
        id: "cut",
        text: "Cut",
        enabled: false,
        accelerator: "CmdOrCtrl+X",
        action: () => {
          console.log("Cut clicked!!!");
        },
      },
      {
        id: "copy",
        text: "Copy",
        enabled: false,
        accelerator: "CmdOrCtrl+C",
        action: () => {
          console.log("Copy clicked!!!");
        },
      },
      {
        id: "paste",
        text: "Paste",
        enabled: false,
        accelerator: "CmdOrCtrl+V",
        action: () => {
          console.log("Paste clicked!!!");
        },
      },
      {
        id: "select_all",
        text: "Select All",
        accelerator: "CmdOrCtrl+A",
        action: () => {
          console.log("Select All clicked!!!");
        },
      },
    ],
  });

  const viewMenu = await Submenu.new({
    id: "view",
    text: "View",
    items: [
      {
        id: "as_list",
        text: "As List",
        accelerator: "CmdOrCtrl+1",
        action: () => {
          console.log("As List clicked!!!");
          changeFileViewOption("list");
        },
      },
      {
        id: "as_detailed_list",
        text: "As Detailed List",
        accelerator: "CmdOrCtrl+2",
        action: () => {
          console.log("As Detailed List clicked!!!");
          changeFileViewOption("detailed-list");
        },
      },
      {
        id: "as_grid",
        text: "As Grid",
        accelerator: "CmdOrCtrl+3",
        action: () => {
          console.log("As Grid clicked!!!");
          changeFileViewOption("grid");
        },
      },
      separator,
      await Submenu.new({
        id: "sort_by",
        text: "Sort By",
        items: [
          {
            id: "sort_by_default",
            text: "Default",
            accelerator: "CmdOrCtrl+Alt+Shift+0",
            action: () => {
              console.log("Clicked Sort by Default");
            },
          },
          separator,
          {
            id: "sort_by_name",
            text: "Name",
            accelerator: "CmdOrCtrl+Alt+Shift+1",
            action: () => {
              console.log("Clicked Sort by Name");
            },
          },
          {
            id: "sort_by_type",
            text: "Type",
            accelerator: "CmdOrCtrl+Alt+Shift+2",
            action: () => {
              console.log("Clicked Sort by Type");
            },
          },
          {
            id: "sort_by_date_last_opened",
            text: "Date Last Opened",
            accelerator: "CmdOrCtrl+Alt+Shift+3",
            action: () => {
              console.log("Clicked Sort by Date Last Opened");
            },
          },
          {
            id: "sort_by_date_added",
            text: "Date Added",
            accelerator: "CmdOrCtrl+Alt+Shift+4",
            action: () => {
              console.log("Clicked Sort by Date Added");
            },
          },
          {
            id: "sort_by_date_modified",
            text: "Date Modified",
            accelerator: "CmdOrCtrl+Alt+Shift+5",
            action: () => {
              console.log("Clicked Sort by Date Modified");
            },
          },
          {
            id: "sort_by_date_created",
            text: "Date Created",
            accelerator: "CmdOrCtrl+Alt+Shift+6",
            action: () => {
              console.log("Clicked Sort by Date Created");
            },
          },
          {
            id: "sort_by_size",
            text: "Size",
            accelerator: "CmdOrCtrl+Alt+Shift+7",
            action: () => {
              console.log("Clicked Sort by Size");
            },
          },
          {
            id: "sort_by_tags",
            text: "Tags",
            accelerator: "CmdOrCtrl+Alt+Shift+8",
            action: () => {
              console.log("Clicked Sort by Tags");
            },
          },
        ],
      }),
      separator,
      {
        id: "reload",
        text: "Reload",
        accelerator: "CmdOrCtrl+R",
        action: async () => {
          console.log("Reload clicked!!!");

          try {
            // Emit a custom event
            await emit("reload", {});

            // Reset app store state
            const appStore = useAppStore.getState();
            appStore.reset();

            // reload the app
            await relaunch();
          } catch (error) {
            console.error("Error reloading window:", error);
          }
        },
      },
    ],
  });

  const windowMenu = await Submenu.new({
    id: "window",
    text: "Window",
    items: [
      {
        id: "minimize",
        text: "Minimize",
        action: () => {
          console.log("Minimize clicked!!!");
        },
      },
    ],
  });

  const helpMenu = await Submenu.new({
    id: "help",
    text: "Help",
    items: [
      {
        id: "give_feedback",
        text: "Give Feedback",
        action: () => {
          console.log("Give Feedback!!!");
        },
      },
      {
        id: "report_bug_issue",
        text: "Report Bug/Issue",
        action: () => {
          console.log("Report Bug/Issue!!!");
        },
      },
      separator,
      {
        id: "connect_dev",
        text: "Connect Developer",
        action: () => {
          console.log("Connect Developer!!!");
        },
      },
    ],
  });

  const menu = await Menu.new({
    id: "better-file-manager-menu",
    items: [appMenu, fileMenu, editMenu, viewMenu, windowMenu, helpMenu],
  });

  menu
    .setAsAppMenu()
    .then(() => {
      console.log("Menu set successfully!");
    })
    .catch((error: Error) => {
      console.error("Error setting Menu: ", error);
    });
}
