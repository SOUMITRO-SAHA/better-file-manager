use tauri::{AppHandle, command};
use tauri_plugin_shell::{ShellExt};
use tauri_plugin_shell::process::Command;

#[command]
pub fn copy_file(app:AppHandle, source: String, destination: String) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell.command("cmd").args(&["/C", "copy", &source, &destination])
    } else {
        shell.command("cp").args(&[&source, &destination])
    };

    execute_command(command)
}

#[command]
pub fn move_file(app: AppHandle, source: String, destination: String) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell.command("cmd").args(&["/C", "move", &source, &destination])
    } else {
        shell.command("mv").args(&[&source, &destination])
    };

    execute_command(command)
}

#[command]
pub fn list_directory(app:AppHandle, directory: String) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell.command("cmd").args(&["/C", "list", &directory])
    } else {
        shell.command("ls").args(&["-l", &directory])
    };

    execute_command(command)
}

#[command]
pub fn working_directory(app:AppHandle) -> Result<String, String> {
    let shell = app.shell();
    let command = if cfg!(target_os = "windows") {
        shell.command("cmd").args(&["/C", "cd"])
    } else {
        shell.command("pwd")
    };

    execute_command(command)
}

async fn execute_command(mut command: Command) -> Result<String, String> {
    let output = command.output().await.map_err(|e| e.to_string())?;

    if output.status.success() {
        String::from_utf8(output.stdout).map_err(|e| e.to_string())
    } else {
        Err(String::from_utf8(output.stderr).unwrap_or_else(|_| "Unknown error".to_string()))
    }
}