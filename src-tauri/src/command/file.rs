//! Commands for interaction with the local file system.

use crate::storage::local::{FileMetadata, LocalFileSystem};
use std::path::{Path, PathBuf};
use tauri::command;

// /// Lists files in a directory.
// #[cfg(desktop)]
// #[command]
// pub fn list_files(directory: PathBuf) -> Result<Vec<PathBuf>, String> {
//      LocalFileSystem::list_files(directory).map_err(|e| e.to_string())
// }

/// Reads the contents (both files and directories) of a directory.
#[cfg(desktop)]
#[command]
pub fn read_inside_dir(path: &Path) -> Result<Vec<FileMetadata>, String> {
    LocalFileSystem::read_inside_dir(path).map_err(|e| e.to_string())
}

/// Deletes a file.
#[cfg(desktop)]
#[command]
pub fn delete_file(path: PathBuf) -> Result<(), String> {
    LocalFileSystem::delete_file(path).map_err(|e| e.to_string())
}

/// Lists directories inside a folder.
// #[cfg(desktop)]
// #[command]
// pub fn list_directories(directory: PathBuf) -> Result<Vec<PathBuf>, String> {
//     LocalFileSystem::list_dirs(directory).map_err(|e| e.to_string())
// }

/// Create directory on a specific folder.
#[cfg(desktop)]
#[command]
pub fn create_directory(directory: PathBuf) -> Result<(), String> {
    LocalFileSystem::create_dir(directory).map_err(|e| e.to_string())
}

/// Deletes a directory and its contents.
#[cfg(desktop)]
#[command]
pub fn delete_directory(path: PathBuf) -> Result<(), String> {
    LocalFileSystem::delete_dir(path).map_err(|e| e.to_string())
}

/// Moves a directory from `from` to `to`.
#[cfg(desktop)]
#[command]
pub fn move_directory(from: PathBuf, to: PathBuf) -> Result<(), String> {
    LocalFileSystem::move_dir(from, to).map_err(|e| e.to_string())
}

/// Copies a directory from `from` to `to`.
#[cfg(desktop)]
#[command]
pub fn copy_directory(from: PathBuf, to: PathBuf) -> Result<(), String> {
    LocalFileSystem::copy_dir(from, to).map_err(|e| e.to_string())
}

/// List user a directory.
#[cfg(desktop)]
#[command]
pub fn get_user_directory() -> Result<Vec<PathBuf>, String> {
    LocalFileSystem::list_user_folders().map_err(|e| e.to_string())
}
