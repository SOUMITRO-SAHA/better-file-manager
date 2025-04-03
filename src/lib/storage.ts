import { load } from "@tauri-apps/plugin-store";
import superjson from "superjson";
import { StateStorage } from "zustand/middleware";

const store = await load("bfm.json", { autoSave: true });

export const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const data = (await store.get(name)) as any;

    if (data === undefined) return null;
    try {
      const parsed = superjson.parse(data);
      return superjson.stringify(parsed);
    } catch (e) {
      return data;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const parsed = superjson.parse(value);
      const serialized = superjson.stringify(parsed);
      await store.set(name, serialized);
    } catch (e) {
      await store.set(name, value);
    }
  },
  // Remove the item from the store
  removeItem: async (name: string): Promise<void> => {
    await store.delete(name);
  },
};
