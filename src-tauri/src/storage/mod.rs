//! The storage module provides functionality to interact with local file system.
//!
//! It contains logic for reading, writing and managing files on the local.
//!
//! # Modules
//!
//! - `local`: Contains functions and a struct to handle local storage operations.

pub mod local;
pub mod disk;
mod user;
mod symlink;