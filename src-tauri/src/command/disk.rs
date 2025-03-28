//! Disk related commands

use crate::storage::disk::DiskInfo;
use tauri::command;

#[cfg(desktop)]
#[command]
pub fn get_disk_info() -> Result<Vec<DiskInfo>, String> {
    let disk = DiskInfo::get_disks().unwrap();
    Ok(disk)
}
