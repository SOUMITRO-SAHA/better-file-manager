//! Module for obtaining disk information.
//!
//! this module provides functionalities to analyze disk usage, mounted devices,
//! symbolic links, and real-time disk information using `sysinfo` and `walkdir`

use crate::common::error::FileManagerError;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::PathBuf;
use sysinfo::Disks;

/// Represents information about a connected disk.
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DiskInfo {
    /// The name of the disk.
    pub name: String,
    /// The mount point of the disk.
    pub mount_point: PathBuf,
    /// The total space of the disk in bytes.
    pub total_space: u64,
    /// The available free space of the disk in bytes
    pub available_space: u64,
}

impl DiskInfo {
    /// Retries a list of available disks along with their metadata.
    ///
    /// This function fetches all mounted disks, groups then by name,
    /// and ensure that system volumes (e.g. `/` on Unix) are prioritized.
    ///
    /// # Returns
    /// A vector of `DiskInfo` structs, sorted by system volumes first and total space.
    pub fn get_disks() -> Result<Vec<Self>, FileManagerError> {
        let disks = Disks::new_with_refreshed_list();
        if disks.is_empty() {
            return Err(FileManagerError::GeneralError("No disks found".to_string()));
        }

        let mut grouped_disks: HashMap<String, DiskInfo> = HashMap::new();

        for disk in disks.iter() {
            let info = DiskInfo {
                name: disk.name().to_string_lossy().to_string(),
                mount_point: disk.mount_point().to_path_buf(),
                total_space: disk.total_space(),
                available_space: disk.available_space(),
            };

            grouped_disks
                .entry(info.name.clone())
                .and_modify(|existing: &mut DiskInfo| {
                    if info.mount_point == PathBuf::from("/") {
                        *existing = info.clone();
                    }
                })
                .or_insert(info);
        }

        // Convert the grouped disks to a vector
        let mut disks_vec: Vec<DiskInfo> = grouped_disks.into_values().collect();

        // Sorting
        disks_vec.sort_by(|a, b| {
            let a_rank = if a.mount_point == PathBuf::from("/") {
                0
            } else {
                1
            };

            let b_rank = if b.mount_point == PathBuf::from("/") {
                0
            } else {
                1
            };

            a_rank
                .cmp(&b_rank)
                .then_with(|| a.total_space.cmp(&b.total_space))
        });

        Ok(disks_vec)
    }
}

/// Example tests
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_disks() {
        let disks = DiskInfo::get_disks();
        assert!(!disks.is_ok(), "Failed to retrieve disk information");
        let disks = disks.unwrap();
        assert!(!disks.is_empty(), "No disks found!");
    }
}
