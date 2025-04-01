import { StateStorage } from "zustand/middleware";
import { load } from "@tauri-apps/plugin-store";
const store = await load("bfm.json", { autoSave: true });

export const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await store.get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await store.set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await store.delete(name);
  },
};
