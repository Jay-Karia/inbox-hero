"use client";

import { FaExclamationCircle } from "react-icons/fa";
import { type Session as SessionType } from "../../generated/prisma";
import Session from "./session";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface AllSessionsProps {
  sessions: SessionType[];
}

export default function AllSessions({ sessions }: AllSessionsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white space-x-8">
          All Sessions
        </h2>
        <p className="text-sm text-gray-400 flex justify-center items-center mt-2">
          {sessions.length > 0
            ? `You have ${sessions.length} session(s).`
            : "No sessions available."}
          <Tooltip>
            <TooltipTrigger asChild>
              <FaExclamationCircle className="inline-block ml-2 text-gray-400 hover:text-white cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Only last 20 sessions will be stored.</p>
            </TooltipContent>
          </Tooltip>
        </p>
      </div>

      {/* Sessions List */}
      {sessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <Session key={session.id} session={session} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <p>No sessions available. Start a new session to see it here!</p>
        </div>
      )}
    </div>
  );
}
