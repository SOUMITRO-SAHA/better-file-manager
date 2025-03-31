//! General utility functions for the file management.
//!
//! This module contains helper functions such as file reading/writing.
//! directory traversal, and formatting functions that are used throughout
//! the application

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
