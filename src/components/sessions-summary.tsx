import { FaClock, FaThLarge } from "react-icons/fa";
import { Session } from "../../generated/prisma";
import { CardContent } from "./ui/card";
import {formatDuration} from "@/lib/date";
import {CardSpotlight} from "./ui/card-spotlight";

interface SessionsSummaryProps {
  sessions: Session[];
}

export default function SessionsSummary({ sessions }: SessionsSummaryProps) {
  const targetAchieved = sessions.filter(
    (session) => session.target <= session.emailsProcessed
  ).length;

  const sessionsSummary = {
    averageDuration: 100,
    totalSessions: sessions.length,
    successRate: Math.round(
      (targetAchieved / sessions.length) * 100
    ) || 0,
  };

  return (
    <div>
      {sessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardSpotlight className="bg-gray-900 border-gray-800 p-0">
            <CardContent className="p-4 text-center z-20 relative">
              <div className="flex justify-center mb-2">
                <FaClock className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {formatDuration(sessionsSummary.averageDuration)}
              </div>
              <div className="text-xs text-gray-400">Average Duration</div>
            </CardContent>
          </CardSpotlight>

          <CardSpotlight className="bg-gray-900 border-gray-800 p-0">
            <CardContent className="p-4 text-center z-20 relative">
              <div className="flex justify-center mb-2">
                <FaThLarge className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {sessionsSummary.totalSessions}
              </div>
              <div className="text-xs text-gray-400">Total Sessions</div>
            </CardContent>
          </CardSpotlight>

          <CardSpotlight className="bg-gray-900 border-gray-800 p-0">
            <CardContent className="p-4 text-center z-20 relative">
              <div className="flex justify-center mb-2">
                <FaClock className="h-5 w-5 text-orange-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {sessionsSummary.successRate}%
              </div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </CardContent>
          </CardSpotlight>
        </div>
      ) : (
        <>
          <div className="text-center text-gray-400">
            <p>No sessions available.</p>
            <p className="mt-2">Start a new session to see statistics.</p>
          </div>
        </>
      )}
    </div>
  );
}
