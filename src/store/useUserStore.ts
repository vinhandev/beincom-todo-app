import { create } from "zustand"
import { persist, StateStorage } from "zustand/middleware"

import { storage } from "@/App"

export const MMKVStorage: StateStorage = {
  setItem(name, value) {
    return storage.set(name, value)
  },
  getItem(name) {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem(name) {
    return storage.delete(name)
  },
}

export type sortModeType = "asc" | "desc" | "default"
type UserStore = {
  sortMode: sortModeType
  setSortMode: (mode: sortModeType) => void
}
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      sortMode: "default",
      setSortMode: (mode: sortModeType) => set({ sortMode: mode }),
    }),
    {
      name: "user",
      getStorage: () => MMKVStorage,
    },
  ),
)
export default useUserStore
