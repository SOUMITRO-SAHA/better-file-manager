//! Module for obtaining disk information.
//!
//! this module provides functionalities to analyze disk usage, mounted devices,
//! symbolic links, and real-time disk information using `sysinfo` and `walkdir`

use std::collections::HashMap;
use std::path::PathBuf;
use serde::{Deserialize, Serialize};
use sysinfo::Disks;
use crate::common::error::FileManagerError;

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
    pub fn get_disks() -> Vec<Self> {
        let disks = Disks::new_with_refreshed_list();
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
                    // If the current disk is mounted at "/" (system volume), prefer it.
                    if info.mount_point == PathBuf::from("/") {
                        *existing = info.clone();
                    }
                })
                .or_insert(info);
        }

        // Convert the grouped disks to a vector
        let mut disks_vec: Vec<DiskInfo> = grouped_disks.into_iter().map(|(_, v)| v).collect();

        // Sorting
        disks_vec.sort_by(|a, b| {
            let a_rank = if a.mount_point == PathBuf::from("/") {0}else{1};
            let b_rank = if b.mount_point == PathBuf::from("/") {0}else{1};

            a_rank.cmp(&b_rank).then_with(|| a.total_space.cmp(&b.total_space))
        });

        disks_vec
    }


}

/// Example tests
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_disks() {
        let disks = DiskInfo::get_disks();
        assert!(!disks.is_empty(), "No disks found!");
    }
}
