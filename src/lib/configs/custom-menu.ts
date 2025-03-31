import { Menu, PredefinedMenuItem, Submenu } from "@tauri-apps/api/menu";

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
      action: () => {
        console.log("Clicked Hide better file manager!!!");
      },
    },
    {
      id: "hide_others",
      text: "Hide Others",
      accelerator: "Alt+CmdOrCtrl+H",
      action: () => {
        console.log("Clicked Hide others!!!");
      },
    },
    separator,
    {
      id: "settings",
      text: "Settings",
      accelerator: "CmdOrCtrl+,",
      action: () => {
        console.log("Check for Settings!!!");
      },
    },
    {
      id: "quit",
      text: "Quit",
      accelerator: "CmdOrCtrl+Q",
      action: () => {
        console.log("Quit");
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
        console.log("Clicked Split Window");
      },
    },
    {
      id: "close_split_window",
      text: "Close Split Window",
      accelerator: "CmdOrCtrl+Alt+I",
      action: () => {
        console.log("Clicked Close Split Window");
      },
    },
    separator,
    {
      id: "find",
      text: "Find",
      accelerator: "CmdOrCtrl+F",
      action: () => {
        console.log("Clicked Find");
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
      action: () => {
        console.log("Redo clicked!!!");
      },
    },
    separator,
    {
      id: "redo",
      text: "Redo",
      accelerator: "CmdOrCtrl+Shift+Z",
      action: () => {
        console.log("Redo clicked!!!");
      },
    },
    {
      id: "cut",
      text: "Cut",
      accelerator: "CmdOrCtrl+X",
      action: () => {
        console.log("Cut clicked!!!");
      },
    },
    {
      id: "copy",
      text: "Copy",
      accelerator: "CmdOrCtrl+C",
      action: () => {
        console.log("Copy clicked!!!");
      },
    },
    {
      id: "paste",
      text: "Paste",
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
      },
    },
    {
      id: "as_detailed_list",
      text: "As Detailed List",
      accelerator: "CmdOrCtrl+2",
      action: () => {
        console.log("As Detailed List clicked!!!");
      },
    },
    {
      id: "as_grid",
      text: "As Grid",
      accelerator: "CmdOrCtrl+3",
      action: () => {
        console.log("As Grid clicked!!!");
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
      action: () => {
        console.log("Reload clicked!!!");
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
