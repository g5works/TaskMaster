#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri_plugin_fs_extra::FsExtra;

fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .plugin(FsExtra::default())
    .menu(tauri::Menu::os_default(&context.package_info().name))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
