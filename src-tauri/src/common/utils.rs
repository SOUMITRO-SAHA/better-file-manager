//! General utility functions for the file management.
//!
//! This module contains helper functions such as file reading/writing.
//! directory traversal, and formatting functions that are used throughout
//! the application

use std::{fs, io};
use std::path::Path;

/// Checks whether a given path exists and is a directory
///
/// # Arguments
/// * `path` -- A reference to the path to check
///
/// # Returns
///
/// Returns `true` if the path exists and is a directory, or `false` otherwise.
///
/// # Examples
///
/// ```rust
/// use crate::common::utils::is_directory;
///
/// let exists = is_directory("path/to/directory");
/// println!("Directory exists: {}", exists);
/// ```
pub fn is_directory<P: AsRef<Path>>(path: P) -> bool {
    path.as_ref().is_dir()
}

/// Recursively lists files in a directory.
///
/// # Arguments
///
/// * `dir_path` - A reference to the directory path to traverse.
///
/// # Returns
///
/// Returns a `Result` containing a vector of file paths as `String`s if
/// successful, or an `io::Error` otherwise.
///
/// # Example
///
/// ```rust
/// use crate::common::utils::list_files_recursive;
///
/// let files = list_files_recursive("path/to/directory")
///             .expect("Failed to list files);
/// for file in files {
///     println("{}", file);
/// }
/// ```
pub fn list_files_recursive<P : AsRef<Path>>(dir_path: P) ->io::Result<Vec<String>> {
    let mut file_list = Vec::new();
    for entry in fs::read_dir(dir_path) ? {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() {
            file_list.extend(list_files_recursive(&path)?);
        } else if let Some(path_str) = path.to_str() {
            file_list.push(path_str.to_string());
        }
    }
    Ok(file_list)
}

/// Formats a file size (in bytes) into a human-readable string.
/// # Arguments
///
/// * `size_bytes` - The size in bytes.
///
/// # Returns
///
/// Returns a `String` representing the human-readable file size (e.g. `1.25 MB`).
///
/// # Examples
///
/// ```rust
/// use create::common::utils::format_file_size;
///
/// let size_str = format_file_size(1_234_567);
/// println!("File size: {}", size_str);
/// ```
pub fn format_file_size(size_bytes: u64) -> String {
    const KB: u64 = 1024;
    const MB: u64 = 1024 * KB;
    const GB: u64 = 1024 * MB;

    if size_bytes >= GB {
        format!("{:.2} GB", size_bytes as f64 / GB as f64)
    } else if size_bytes >= MB {
        format!("{:.2} MB", size_bytes as f64 / MB as f64)
    } else if size_bytes >= KB {
        format!("{:.2} KB", size_bytes as f64 / KB as f64)
    } else  {
        format!("{:.1} B", size_bytes)
    }
}