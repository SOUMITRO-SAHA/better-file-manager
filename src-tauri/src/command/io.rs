//! This is the I/O commands

use std::path::PathBuf;
use crate::storage::local::{LocalFileSystem};

/// Lists all subdirectories at the given path.
///
/// # Arguments
///
/// * `path` - A string representing the directory path to scan.
///
/// # Returns
///
/// On success, returns a vector of directory paths as strings; on failure,
/// returns an error message as a string.
#[tauri::command]
pub fn list_directories(path: String) -> Result<Vec<String>, String> {
    LocalFileSystem::list_dirs(&path)
        .map(|paths: Vec<PathBuf>| {
            paths.into_iter()
            .filter_map(|p| p.to_str().map(|s| s.to_string()))
            .collect()
        }).map_err(|e| e.to_string())
}

/// Deletes a directory (and all its contents) at the specified path.
///
/// # Argument
///
/// * `path` - A string representing the directory path.
///
/// # Returns
///
/// On success, returns a success message; on failure, returns an error message.
#[tauri::command]
pub fn delete_directory(path: String) -> Result<String, String> {
    LocalFileSystem::delete_dir(&path)
    .map(|_| format!("Successfully deleted directory {}", path))
    .map_err(|e| e.to_string())
}