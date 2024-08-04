import { create } from "zustand"

export type sortModeType = "asc" | "desc" | "default"
type UserStore = {
  sortMode: sortModeType
  setSortMode: (mode: sortModeType) => void
}
const useUserStore = create<UserStore>((set) => ({
  sortMode: "default",
  setSortMode: (mode: sortModeType) => set({ sortMode: mode }),
}))
export default useUserStore
