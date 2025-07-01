import { atom } from "jotai";
import { Session } from "../../generated/prisma";

export const sessionsAtom = atom<Session[]>([]);
