//! Commands for cli using `tauri_plugin_shell`

use tauri::{command, AppHandle};
use tauri_plugin_shell::process::Command;
use tauri_plugin_shell::ShellExt;

/// Copies a file from `source` to `destination` using system shell commands.
///
/// # Arguments
///
/// * `app` - the tauri application handle.
/// * `source` - the source file path as a `String`.
/// * `destination` - the destination file path as a `String`.
///
/// # Returns
///
/// A `Result` containing the output of the copy command as a `String` if successful,
/// or an error message as a `String` otherwise.
#[command]
pub async fn copy_file(app: AppHandle, source: String, destination: String) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell
            .command("cmd")
            .args(&["/C", "copy", &source, &destination])
    } else {
        shell.command("cp").args(&[&source, &destination])
    };

    execute_command(command).await
}

/// Moves a file from `source` to `destination` using system shell commands.
///
/// # Arguments
///
/// * `app` - The Tauri application handle.
/// * `source` - The source file path as a `String`.
/// * `destination` - The destination file path as a `String`.
///
/// # Returns
///
/// A `Result` containing the output of the move command as a `String` if successful,
/// or an error message as a `String` otherwise.
#[command]
pub async fn move_file(app: AppHandle, source: String, destination: String) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell
            .command("cmd")
            .args(&["/C", "move", &source, &destination])
    } else {
        shell.command("mv").args(&[&source, &destination])
    };

    execute_command(command).await
}

/// Lists the contents of a directory using system shell commands.
///
/// # Arguments
///
/// * `app` - The Tauri application handle.
/// * `directory` - The directory path to list as a `String`.
///
/// # Returns
///
/// A `Result` containing the output of the list command as a `String` if successful,
/// or an error message as a `String` otherwise.
#[command]
pub async fn list_directory(app: AppHandle, directory: String) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell.command("cmd").args(&["/C", "list", &directory])
    } else {
        shell.command("ls").args(&["-l", &directory])
    };

    execute_command(command).await
}

/// Retrieves the current working directory using system shell commands.
///
/// # Arguments
///
/// * `app` - The Tauri application handle.
///
/// # Returns
///
/// A `Result` containing the current working directory as a `String` if successful,
/// or an error message as a `String` otherwise.

#[command]
pub async fn working_directory(app: AppHandle) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell.command("cmd").args(&["/C", "cd"])
    } else {
        shell.command("pwd")
    };

    execute_command(command).await
}

/// Retrieves disk usage information using system shell commands.
///
/// # Arguments
///
/// * `app` - The Tauri application handle.
///
/// # Returns
/// A `Result` containing disk usage information as a `String` if successful,
/// or an error message as a `String` otherwise.
#[command]
pub async fn disk_usage(app: AppHandle) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell.command("cmd").args(&["/C", "wmic", "logicaldisk", "get", "size,freespace,caption"])
    } else {
        shell.command("df").args(&["-h"])
    };

    execute_command(command).await
}

/// Executes a shell command asynchronously and returns its output as a `String`.
///
/// # Arguments
///
/// * `command` - A `Command` instance from `tauri_plugin_shell`.
///
/// # Returns
///
/// A `Result` containing the command's standard output as a `String` if successful,
/// or an error message as a `String` otherwise.
async fn execute_command(command: Command) -> Result<String, String> {
    let output = command.output().await.map_err(|e| e.to_string())?;

    if output.status.success() {
        String::from_utf8(output.stdout).map_err(|e| e.to_string())
    } else {
        Err(String::from_utf8(output.stderr).unwrap_or_else(|_| "Unknown error".to_string()))
    }
}
