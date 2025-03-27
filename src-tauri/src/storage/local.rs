use crate::common::error::FileManagerError;
use std::fs;
use std::path::{Path, PathBuf};

/// Providers methods to interact with the local file system.
pub struct LocalFileSystem;

// TODO: Symlinks
impl LocalFileSystem {
    pub fn read_file<P: AsRef<Path>>(path: P) -> Result<String, FileManagerError> {
        let contents = fs::read_to_string(path)?;
        Ok(contents)
    }

    pub fn write_file<P: AsRef<Path>>(path: P, data: &str) -> Result<(), FileManagerError> {
        fs::write(path, data)?;
        Ok(())
    }

    pub fn list_files<P: AsRef<Path>>(path: P) -> Result<Vec<PathBuf>, FileManagerError> {
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

    pub fn delete_file<P: AsRef<Path>>(path: P) -> Result<(), FileManagerError> {
        fs::remove_file(path)?;
        Ok(())
    }

    pub fn create_dir<P: AsRef<Path>>(path: P) -> Result<(), FileManagerError> {
        fs::create_dir(path)?;
        Ok(())
    }

    pub fn list_dirs<P: AsRef<Path>>(path: P) -> Result<Vec<PathBuf>, FileManagerError> {
        let mut directories = Vec::new();
        let path_ref = path.as_ref();

        if !path_ref.is_dir() {
            return Err(FileManagerError::GeneralError(format!("{} is not a directory",
                                                              path_ref.display())));
        }

        Self::collect_directories(path_ref, &mut directories)?;
        Ok(directories)
    }

    pub fn delete_dir<P: AsRef<Path>>(path: P) -> Result<(), FileManagerError> {
        fs::remove_dir_all(path)?;
        Ok(())
    }

    pub fn move_dir<P: AsRef<Path>, Q: AsRef<Path>>(from: P, to: Q) -> Result<(), FileManagerError> {
        fs::rename(from, to)?;
        Ok(())
    }

    pub fn copy_dir<P: AsRef<Path>, Q: AsRef<Path>>(from: P, to: Q) -> Result<(), FileManagerError> {
        let src_path = from.as_ref();
        let dist_path = to.as_ref();

        if !src_path.is_dir() {
            return Err(FileManagerError::GeneralError(format!(
                "Source {} is not a directory",
                src_path.display()
            )))
        }

        // Create the destination directory if it doesn't exist.
        fs::create_dir_all(dist_path)?;

        for entry in fs::read_dir(src_path)? {
            let entry = entry?;
            let file_type = entry.file_type()?;
            let src_entry_path = entry.path();
            let dest_entry_path = dist_path.join(entry.file_name());

            if file_type.is_dir() {
                // Recursively copy the subdirectory
                Self::copy_dir(&src_entry_path, &dest_entry_path)?
            } else if file_type.is_file() {
                fs::copy(src_entry_path, dest_entry_path)?;
            }
        }
        Ok(())
    }

    /// Helper function that recursively collects directories from the given path.
    ///
    /// # Argument
    ///
    /// * `path` - The starting directory path.
    /// * `directories` - A mutable reference to a vector that accumulates directory paths.
    fn collect_directories(path: &Path, directories: &mut Vec<PathBuf>) -> Result<(), FileManagerError> {
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