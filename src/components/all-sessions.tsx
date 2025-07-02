"use client";

import { type Session as SessionType } from "../../generated/prisma";
import Session from "./session";

interface AllSessionsProps {
  sessions: SessionType[];
}

export default function AllSessions({ sessions }: AllSessionsProps) {
  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">
        All Sessions ({sessions.length})
      </h2>
      {sessions.length > 0 ? (
        <>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
            {sessions.map((session) => (
              <div key={session.id} className="mb-2">
                <Session session={session} />
              </div>
            ))}
          </pre>
        </>
      ) : (
        <div className="text-gray-400">No sessions available.</div>
      )}
    </div>
  );
}
