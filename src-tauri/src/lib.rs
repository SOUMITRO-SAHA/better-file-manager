mod command;
mod common;
mod storage;

use command::disk::get_disk_info;
use command::file::{
    copy_directory, create_directory, delete_directory, delete_file, get_user_directory,
    move_directory, read_inside_dir,
};
use command::symlink::{create_symlink, delete_symlink, get_symlinks};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_disk_info,
            create_symlink,
            get_symlinks,
            delete_symlink,
            delete_directory,
            copy_directory,
            move_directory,
            read_inside_dir,
            get_user_directory,
            create_directory,
            delete_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
