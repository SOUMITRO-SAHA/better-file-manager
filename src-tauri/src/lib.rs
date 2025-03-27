mod command;
mod common;
mod storage;

use crate::common::error::FileManagerError;
use command::disk::get_disk_info;
use common::utils::format_file_size;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_disk_info, format_file_size])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
