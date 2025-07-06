import { atomWithStorage } from "jotai/utils";
import { Session, Stats } from "../../generated/prisma";
import { DEFAULT_SETTINGS, mockEmails } from "@/constants";
import { Settings } from "@/types/settings";
import {Email} from "@/types/emails";

export const sessionsAtom = atomWithStorage<Session[]>("sessions", []);
export const settingsAtom = atomWithStorage<Settings>(
  "settings",
  DEFAULT_SETTINGS
);
export const sessionActiveAtom = atomWithStorage<boolean>(
  "sessionActive",
  false
);
export const statsAtom = atomWithStorage<Stats | null>("stats", null);
export const emailsAtom = atomWithStorage<Email[]>("emails", mockEmails)
