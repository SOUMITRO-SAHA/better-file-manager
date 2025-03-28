//! Error definitions for the file management project.
//!
//! This module defines a custom error type to capture errors the file
//! management logic, including I/O errors, configuration issues, cloud provider
//! integration problems, and CLI parsing errors
//! and general errors. this implementation utilises the `thiserror` crate for a cleaner
//! and more maintainable error-handling approach
use std::io;
use thiserror::Error;

#[non_exhaustive]
#[derive(Error, Debug)]
pub enum FileManagerError {
    /// An I/O error occurred.
    #[error("I/O error: {0}")]
    IoError(#[from] io::Error),

    /// An error occurred while parsing or handling configuration.
    #[error("Configuration error: {0}")]
    ConfigError(String),

    /// An error occurred during CLI processing
    #[error("CLI error: {0}")]
    CliError(String),

    /// A general error, with a custom message.
    #[error("General error: {0}")]
    GeneralError(String),
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io;

    #[test]
    fn test_io_error_conversion() {
        let io_err = io::Error::new(io::ErrorKind::Other, "sample I/O error");
        let file_manager_err: FileManagerError = io_err.into();
        assert_eq!(
            format!("{}", file_manager_err),
            "I/O error: sample I/O error"
        );
    }

    #[test]
    fn test_config_error_display() {
        let err = FileManagerError::ConfigError("invalid configuration".to_string());
        assert_eq!(
            format!("{}", err),
            "Configuration error: invalid configuration"
        );
    }

    #[test]
    fn test_cli_error_display() {
        let err = FileManagerError::CliError("CLI parsing failed".to_string());
        assert_eq!(
            format!("{}", err),
            "Configuration error: CLI parsing failed"
        );
    }

    #[test]
    fn test_general_error_error_display() {
        let err = FileManagerError::GeneralError("unexpected error occurred".to_string());
        assert_eq!(
            format!("{}", err),
            "Configuration error: unexpected error occurred"
        );
    }
}
