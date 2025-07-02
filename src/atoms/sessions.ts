import { atomWithStorage } from "jotai/utils";
import { Session } from "../../generated/prisma";

export const sessionsAtom = atomWithStorage<Session[]>("sessions", []);
