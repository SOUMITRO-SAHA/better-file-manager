import { LazyStore } from "@tauri-apps/plugin-store";
import superjson from "superjson";
import { StateStorage } from "zustand/middleware";

const store = new LazyStore("bfm.json", {
  autoSave: true,
});

export const storage: StateStorage = {
  // Get the item from the store
  getItem: async (name: string): Promise<string | null> => {
    try {
      const storeValue = await store.get(name);
      if (storeValue === undefined) return null;
      const parsed = superjson.parse(storeValue as string);
      return superjson.stringify(parsed);
    } catch (error) {
      console.error(`Error getting item from store: ${error}`);
      return null;
    }
  },

  // Set the item in the store
  setItem: async (name: string, value: any): Promise<void> => {
    try {
      const parsed = superjson.parse(value);
      const serialized = superjson.stringify(parsed);
      await store.set(name, serialized);
    } catch (error) {
      console.error(`Error setting item in store: ${error}`);
    }
  },

  // Remove the item from the store
  removeItem: async (name: string): Promise<void> => {
    try {
      await store.delete(name);
    } catch (error) {
      console.error(`Error removing item from store: ${error}`);
    }
  },
};
