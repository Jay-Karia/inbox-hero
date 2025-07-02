"use client";

import { useAtomValue } from "jotai";
import { sessionsAtom } from "@/atoms/sessions";

export default function AllSessions() {
  const sessions = useAtomValue(sessionsAtom);

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">
        All Sessions ({sessions.length})
      </h2>
      <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
        {JSON.stringify(sessions, null, 2)}
      </pre>
    </div>
  );
}
