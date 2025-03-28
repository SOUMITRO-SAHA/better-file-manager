//! Commands for symlink operations in the file manager

use crate::storage::symlink::SymlinkInfo;
use std::path::PathBuf;
use tauri::command;

/// Retrieves all symlinks in a given directory
#[cfg(desktop)]
#[command]
pub fn get_symlinks(directory: PathBuf) -> Result<Vec<SymlinkInfo>, String> {
    SymlinkInfo::find_symlinks(directory).map_err(|e| e.to_string())
}

/// Crates a new symbolic link.
#[cfg(desktop)]
#[command]
pub fn create_symlink(src: PathBuf, dist: PathBuf) -> Result<(), String> {
    SymlinkInfo::create_symlink(src, dist).map_err(|e| e.to_string())
}

/// Delete a symlinks
#[cfg(desktop)]
#[command]
pub fn delete_symlink(path: PathBuf) -> Result<(), String> {
    SymlinkInfo::remove_symlink(path).map_err(|e| e.to_string())
}
