export enum EFileType {
  Folder = "Folder",
  ZipArchive = "ZipArchive",
  PlainText = "PlainText",
  Markdown = "Markdown",
  Image = "Image",
  Audio = "Audio",
  Video = "Video",
  Document = "Document",
  Spreadsheet = "Spreadsheet",
  Presentation = "Presentation",
  Executable = "Executable",
  Library = "Library",
  DiskImage = "DiskImage",
  Archive = "Archive",
  Apk = "Apk",
  Ipa = "Ipa",
  Unknown = "Unknown",
}

export interface IFileMetadata {
  name: string;
  size: number;
  mount_point: string;
  tags: string[];
  file_type: EFileType;
  is_directory: boolean;
  is_file: boolean;
  created_at: string;
  modified_at: string;
  added_at: string;
  open_with: string;
}

export interface IFile {
  metadata: IFileMetadata;
  content: string;
}

export interface IDirectory {
  metadata: IFileMetadata;
  children: IFileMetadata[];
}
