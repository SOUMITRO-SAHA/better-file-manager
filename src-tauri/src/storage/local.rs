//! Module for interacting with local file system.

use crate::common::error::FileManagerError;
use crate::storage::utils::determine_file_type;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};

/// Providers methods to interact with the local file system.
#[derive(Debug, Serialize)]
pub struct LocalFileSystem;

#[derive(Debug, Serialize, Deserialize)]
pub enum EFileType {
    Folder,
    ZipArchive,
    PlainText,
    Markdown,
    Image,
    Audio,
    Video,
    Document,
    Spreadsheet,
    Presentation,
    Executable,
    Library,
    DiskImage,
    Archive,
    Apk, // Android packages
    Ipa, // iOS application
    Unknown,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileMetadata {
    pub name: String,
    pub size: u64,
    pub mount_point: String,
    pub tags: Vec<String>,
    pub file_type: EFileType,
    pub is_directory: bool,
    pub is_file: bool,
    pub created_at: String,
    pub modified_at: String,
    pub added_at: String,
    pub open_with: String,
}

impl FileMetadata {
    pub fn new(path: PathBuf) -> Result<Self, FileManagerError> {
        let metadata = fs::metadata(&path)?;
        let file_name = path
            .file_name()
            .map(|name| name.to_string_lossy().into_owned())
            .unwrap_or_else(|| String::from("unknown"));
        let is_directory = metadata.is_dir();
        let is_file = !is_directory;
        let file_type = determine_file_type(&path, is_directory);

        // Convert system times to human-readable strings using humantime.
        let created_at = metadata
            .created()
            .map(|t| humantime::format_rfc3339(t).to_string())
            .unwrap_or_else(|_| "unknown".to_string());
        let modified_at = metadata
            .modified()
            .map(|t| humantime::format_rfc3339(t).to_string())
            .unwrap_or_else(|_| "unknown".to_string());
        let added_at = metadata
            .created()
            .map(|t| humantime::format_rfc3339(t).to_string())
            .unwrap_or_else(|_| "unknown".to_string());

        let open_with = String::from("unknown");

        Ok(Self {
            name: file_name,
            size: metadata.len(),
            mount_point: String::from("unknown"),
            tags: Vec::new(),
            file_type,
            is_directory,
            is_file,
            created_at,
            modified_at,
            added_at,
            open_with,
        })
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct File {
    pub metadata: FileMetadata,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Directory {
    pub metadata: FileMetadata,
    pub children: Vec<FileMetadata>,
}

impl LocalFileSystem {
    /// Reads the contents (both files and directories) of a directory and returns their metadata.
    ///
    /// # Arguments
    ///
    /// * `path` - The directory to read.
    ///
    /// # Error
    ///
    /// Returns a `FileManagerError` if the directory cannot be read.
    pub fn read_inside_dir(path: &Path) -> Result<Vec<FileMetadata>, FileManagerError> {
        let mut files = Vec::new();
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            match FileMetadata::new(path) {
                Ok(metadata) => files.push(metadata),
                Err(e) => return Err(e),
            }
        }
        Ok(files)
    }

    /// Lists all files in a directory
    ///
    /// # Arguments
    ///
    /// * `path` - The directory to list files from.
    ///
    /// # Error
    ///
    /// Returns a `FileManagerError` if the directory cannot be read.
    fn list_files<P: AsRef<Path>>(path: P) -> Result<Vec<PathBuf>, FileManagerError> {
        let mut files = Vec::new();
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_file() {
                files.push(path);
            }
        }
        Ok(files)
    }

    /// Deletes a file.
    ///
    /// # Arguments
    ///
    /// * `path` - The file to delete.
    ///
    /// # Errors
    ///
    /// Returns a `FileManagerError` if the file cannot be deleted.
    pub fn delete_file<P: AsRef<Path>>(path: P) -> Result<(), FileManagerError> {
        fs::remove_file(path).map_err(FileManagerError::from)
    }

    /// Creates a directory, including parent directories.
    ///
    /// # Arguments
    ///
    /// * `path` - The diretory to create.
    ///
    /// # Error
    ///
    /// Returns a `FileManagerError` if the directory cannot be created.
    pub fn create_dir<P: AsRef<Path>>(path: P) -> Result<(), FileManagerError> {
        fs::create_dir_all(path).map_err(FileManagerError::from)
    }

    /// Lists all directories inside a given directory.
    ///
    /// # Arguments
    ///
    /// * `path` - The strting directory.
    ///
    /// # Errors
    ///
    /// Returns a `FileManagerError` if the directory cannot be read.
    fn list_dirs<P: AsRef<Path>>(path: P) -> Result<Vec<PathBuf>, FileManagerError> {
        let mut directories = Vec::new();
        let path_ref = path.as_ref();

        if !path_ref.is_dir() {
            return Err(FileManagerError::GeneralError(format!(
                "{} is not a directory",
                path_ref.display()
            )));
        }

        Self::collect_directories(path_ref, &mut directories)?;
        Ok(directories)
    }

    /// Deletes a directory and all its contents
    ///
    /// # Arguments
    ///
    /// * `path` - The strting directory.
    ///
    /// # Errors
    ///
    /// Returns a `FileManagerError` if the directory cannot be read.
    pub fn delete_dir<P: AsRef<Path>>(path: P) -> Result<(), FileManagerError> {
        fs::remove_dir_all(path).map_err(FileManagerError::from)
    }

    /// Moves a directory from one location to another.
    ///
    /// # Arguments
    ///
    /// * `from` - The source directory.
    /// * `to` - The destination directory.
    ///
    /// # Errors
    ///
    /// Returns a `FileManagerError` if the directory cannot be read.
    pub fn move_dir<P: AsRef<Path>, Q: AsRef<Path>>(
        from: P,
        to: Q,
    ) -> Result<(), FileManagerError> {
        fs::rename(from, to).map_err(FileManagerError::from)
    }

    /// Copies a directory and its contents to a new location.
    ///
    /// # Arguments
    ///
    /// * `from` - The source directory.
    /// * `to` - The destination directory.
    ///
    /// # Errors
    ///
    /// Returns a `FileManagerError` if the directory cannot be read.
    pub fn copy_dir<P: AsRef<Path>, Q: AsRef<Path>>(
        from: P,
        to: Q,
    ) -> Result<(), FileManagerError> {
        let src_path = from.as_ref();
        let dist_path = to.as_ref();

        if !src_path.is_dir() {
            return Err(FileManagerError::GeneralError(format!(
                "Source {} is not a directory",
                src_path.display()
            )));
        }

        // Create the destination directory if it doesn't exist.
        fs::create_dir_all(dist_path)?;

        for entry in fs::read_dir(src_path)? {
            let entry = entry?;
            let file_type = entry.file_type()?;
            let src_entry_path = entry.path();
            let dest_entry_path = dist_path.join(entry.file_name());

            if file_type.is_dir() {
                Self::copy_dir(&src_entry_path, &dest_entry_path)?
            } else if file_type.is_file() {
                fs::copy(src_entry_path, dest_entry_path)?;
            }
        }
        Ok(())
    }

    /// Retrives all immediate subdirectories (folders) inside the user's home directory.
    ///
    /// This method works across all paltform (Mac, Windows, Linux).
    ///
    /// # Errors
    ///
    /// Returns a `FileManagerError` if the home directory cannot be determined or read.
    pub fn list_user_folders() -> Result<Vec<PathBuf>, FileManagerError> {
        // Use the `dirs` crate to obtain the home directory in a cross-platform way.
        let home_dir = dirs::home_dir().ok_or_else(|| {
            FileManagerError::GeneralError("Unable to determine the home directory".to_string())
        })?;

        let mut folders = Vec::new();
        for entry in fs::read_dir(&home_dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_dir() {
                folders.push(path);
            }
        }

        Ok(folders)
    }

    /// Helper function that recursively collects directories from the given path.
    ///
    /// # Argument
    ///
    /// * `path` - The starting directory path.
    /// * `directories` - A mutable reference to a vector that accumulates directory paths.
    ///
    /// # Errors
    ///
    /// Returns a `FileManagerError` if the directory cannot be read.
    fn collect_directories(
        path: &Path,
        directories: &mut Vec<PathBuf>,
    ) -> Result<(), FileManagerError> {
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let entry_path = entry.path();
            if entry_path.is_dir() {
                directories.push(entry_path.clone());
                Self::collect_directories(&entry_path, directories)?
            }
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::env::temp_dir;
    use std::fs::{create_dir_all, write};

    #[test]
    fn test_read_inside_dir() {
        // Create a temporary directory
        let temp_dir = temp_dir();
        let base_path = temp_dir.as_path();

        // read all files and folder inside temp
        let content_inside = LocalFileSystem::read_inside_dir(base_path);
        println!("{:?}", content_inside);

        assert!(content_inside.is_ok());
    }
}
