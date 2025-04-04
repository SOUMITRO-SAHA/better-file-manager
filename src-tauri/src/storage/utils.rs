use crate::storage::local::EFileType;
use std::fs::FileType;
use std::path::Path;

/// Determines the file type based on the given path and whether it is a directory.
///
/// If `is_directory` is `true`, this function returns [`EFileType::Folder`]. Otherwise, it checks
/// the file extension (converted to lowercase) against a set of known types and returns the corresponding
/// [`EFileType`] variant. If no known extension is matched, it returns [`EFileType::Unknown`].
///
/// # Arguments
///
/// * `path` - The path to the file or directory.
/// * `is_directory` - A boolean flag indicating whether the path represents a directory.
///
/// # Examples
///
/// ```
/// # use crate::storage::local::EFileType;
/// # use your_crate::determine_file_type;
/// # use std::path::Path;
/// let path = Path::new("example.txt");
/// let file_type = determine_file_type(path, false);
/// assert_eq!(file_type, EFileType::PlainText);
/// ```
///
/// # Panics
///
/// This function does not panic.
pub fn determine_file_type(path: &Path, is_directory: bool) -> EFileType {
    if is_directory {
        return EFileType::Folder;
    }

    // Retrieve the file extension (if available), convert it to lowercase, or default to an empty string.
    let ext = path
        .extension()
        .map(|ext| ext.to_string_lossy().to_lowercase())
        .unwrap_or_else(|| "".to_string());

    match ext.as_str() {
        "zip" => EFileType::ZipArchive,
        "txt" => EFileType::PlainText,
        "md" => EFileType::Markdown,
        "jpg" | "jpeg" | "png" | "gif" | "bmp" => EFileType::Image,
        "mp3" | "wav" | "flac" | "aac" => EFileType::Audio,
        "mp4" | "avi" | "mkv" | "mov" => EFileType::Video,
        "doc" | "docx" | "odt" | "pdf" => EFileType::Document,
        "xls" | "xlsx" | "ods" | "csv" => EFileType::Spreadsheet,
        "ppt" | "pptx" | "odp" => EFileType::Presentation,
        "exe" | "bin" | "app" => EFileType::Executable,
        "dll" | "so" | "dylib" => EFileType::Library,
        "iso" | "dmg" => EFileType::DiskImage,
        "rar" | "7z" | "tar" | "gz" => EFileType::Archive,
        "apk" => EFileType::Apk,
        "ipa" => EFileType::Ipa,
        _ => EFileType::Unknown,
    }
}
