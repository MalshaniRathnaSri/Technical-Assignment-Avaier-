import { create } from "zustand"


type Tab = "new" | "in_review" | "approved"


type State = {
activeBorrowerId: string | null
activeTab: Tab
aiAssistantEnabled: boolean
setActiveBorrowerId: (id: string) => void
setActiveTab: (tab: Tab) => void
toggleAiAssistant: () => void
}


export const useAppStore = create<State>((set) => ({
activeBorrowerId: "1",
activeTab: "new",
aiAssistantEnabled: false,
setActiveBorrowerId: (id) => set({ activeBorrowerId: id }),
setActiveTab: (tab) => set({ activeTab: tab }),
toggleAiAssistant: () => set((s) => ({ aiAssistantEnabled: !s.aiAssistantEnabled })),
}))