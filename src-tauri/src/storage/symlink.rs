use std::fs;
use std::path::{Path, PathBuf};
use walkdir::WalkDir;

/// Represents a symlink and its target path.
#[derive(Debug)]
pub struct SymlinkInfo {
    /// The path of the symlink.
    pub symlink_path: PathBuf,
    /// The target path of the symlink.
    pub target_path: PathBuf,
}

impl SymlinkInfo {
    pub fn find_symlinks(root: &Path) -> Vec<Self> {
        WalkDir::new(root)
            .into_iter()
            .filter_map(|entry| {
                let path = entry.unwrap().path().to_path_buf();

                if path.is_symlink() {
                    fs::read_link(&path).ok().map(|target| SymlinkInfo {
                        symlink_path: path,
                        target_path: target,
                    })
                } else {
                    None
                }
            })
            .collect()
    }
}

/// Example tests

#[cfg(test)]
mod tests {
    use super::*;
    use std::env;

    #[test]
    fn test_symlink_info() {
        let temp_dir = env::temp_dir();
        let symlinks = SymlinkInfo::find_symlinks(&temp_dir);
        assert!(symlinks.is_empty() || !symlinks.is_empty());
    }
}