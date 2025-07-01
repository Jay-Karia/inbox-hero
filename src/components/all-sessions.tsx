"use client";

import { Session } from "../../generated/prisma";

interface AllSessionsProps {
  sessions: Session[];
}

export default function AllSessions({ sessions }: AllSessionsProps) {
  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">
        All Sessions ({length})
      </h2>
      <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
        {JSON.stringify(sessions, null, 2)}
      </pre>
    </div>
  );
}
