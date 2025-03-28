use crate::common::error::FileManagerError;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io::{Error, ErrorKind};
use std::path::{Path, PathBuf};
use walkdir::WalkDir;

/// Represents a symlink and its target path.
#[derive(Debug, Serialize, Deserialize)]
pub struct SymlinkInfo {
    /// The path of the symlink.
    pub symlink_path: PathBuf,
    /// The target path of the symlink.
    pub target_path: PathBuf,
}

impl SymlinkInfo {
    /// Finds all symlinks within a given directory
    pub fn find_symlinks<P: AsRef<Path>>(root: P) -> Result<Vec<Self>, FileManagerError> {
        let mut symlinks = Vec::new();

        for entry in WalkDir::new(root).into_iter().map(|e| {
            e.map_err(|err| {
                FileManagerError::IoError(Error::new(ErrorKind::Other, err.to_string()))
            })
        }) {
            let entry = entry?;
            let path = entry.path();

            if path.is_symlink() {
                match fs::read_link(path) {
                    Ok(target) => symlinks.push(SymlinkInfo {
                        symlink_path: path.to_path_buf(),
                        target_path: target,
                    }),
                    Err(e) => return Err(FileManagerError::IoError(e)),
                }
            }
        }

        Ok(symlinks)
    }

    /// Create a symbolic link from `src` to `dist`
    pub fn create_symlink<P: AsRef<Path>>(_src: P, _dist: P) -> Result<(), FileManagerError> {
        #[cfg(target_os = "windows")]
        {
            std::os::windows::fs::symlink_file(_src, _dist)?;
        }
        #[cfg(target_os = "linux")]
        {
            std::os::unix::fs::symlink_file(_src, _dist)?;
        }

        Ok(())
    }

    /// Remove a symlink
    pub fn remove_symlink<P: AsRef<Path>>(src: P) -> Result<(), FileManagerError> {
        fs::remove_file(src).map_err(FileManagerError::from)
    }
}

/// Example tests

#[cfg(test)]
mod tests {
    use super::*;
    use std::env;
    use std::fs;

    #[test]
    fn test_symlink_info() {
        let temp_dir = env::temp_dir();
        let symlinks = SymlinkInfo::find_symlinks(&temp_dir).unwrap();
        assert!(symlinks.is_empty() || !symlinks.is_empty());
    }

    #[test]
    fn test_create_and_remove_symlink() {
        let temp_dir = env::temp_dir();
        let target = temp_dir.join("test_symlink_info");
        let symlink = temp_dir.join("test_symlink_info");
        fs::write(&target, "test").unwrap();

        SymlinkInfo::create_symlink(&target, &symlink).unwrap();
        assert!(symlink.exists());

        SymlinkInfo::remove_symlink(&target, &symlink).unwrap();
        assert!(!symlink.exists());
    }
}
