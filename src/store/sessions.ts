import { create } from "zustand";
import { Session } from "../../generated/prisma";

interface SessionStore {
  sessions: Session[],
  overwriteSessions: (sessions: Session[]) => void,
  clearSessions: () => void,
}

export const useSessionStore = create<SessionStore>()((set) => ({
  sessions: [],
  clearSessions: () => set(() => ({
    sessions: [],
  })),
  overwriteSessions: (sessions) => set(() => ({
    sessions,
  }))
}));
