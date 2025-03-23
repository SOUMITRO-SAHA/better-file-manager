//! Error definitions for the file management project.
//!
//! This module defines a custom error type to capture errors the file
//! management logic, including I/O errors, configuration issues, cloud provider
//! integration problems, and CLI parsing errors

use std::fmt;
use std::io;

pub enum FileManagerError {
    /// An I/O error occurred.
    IoError(io::Error),

    /// An error occurred while parsing or handling configuration.
    ConfigError(String),

    /// An error occurred during CLI processing
    CliError(String),

    /// A general error, with a custom message.
    GeneralError(String),
}

impl fmt::Display for FileManagerError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            FileManagerError::IoError(ref err) => write!(f, "I/O error: {}", err),
            FileManagerError::ConfigError(ref err) => write!(f, "Configuration error: {}", err),
            FileManagerError::CliError(ref err) => write!(f, "Client error: {}", err),
            FileManagerError::GeneralError(ref err) => write!(f, "General error: {}", err),
        }
    }
}

impl std::error::Error for FileManagerError{
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        // Only I/O errors have an underlying source
        match self {
            FileManagerError::IoError(ref err) => Some(err),
        }
    }
}

/// Enable conversion from `std::io::Error` to `FileManagerError`
impl From<io::Error> for FileManagerError {
    fn from(err: io::Error) -> FileManagerError {
        FileManagerError::IoError(err)
    }
}
