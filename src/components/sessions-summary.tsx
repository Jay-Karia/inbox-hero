import { FaClock, FaThLarge, FaTrophy } from "react-icons/fa";
import { Session } from "../../generated/prisma";
import { CardContent } from "./ui/card";
import { formatDuration } from "@/lib/date";
import { CardSpotlight } from "./ui/card-spotlight";
import { Separator } from "./ui/separator";

interface SessionsSummaryProps {
  sessions: Session[];
  isLoading: boolean;
}

export default function SessionsSummary({
  sessions,
  isLoading,
}: SessionsSummaryProps) {
  const targetAchieved = sessions.filter(
    (session) => session.target <= session.emailsProcessed
  ).length;

  const averageDuration =
    sessions.reduce((total, session) => total + (session.duration || 0), 0) /
    sessions.length;

  const sessionsSummary = {
    averageDuration: averageDuration || 0,
    totalSessions: sessions.length,
    successRate: Math.round((targetAchieved / sessions.length) * 100) || 0,
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        <div className="h-28 bg-gray-700 rounded-lg"></div>
        <div className="h-28 bg-gray-700 rounded-lg"></div>
        <div className="h-28 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

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
                <FaTrophy className="h-5 w-5 text-orange-400" />
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
            <p className="mt-2">Start a new session to see summary.</p>
          </div>
          <Separator className="my-8 bg-gray-800" />
        </>
      )}
    </div>
  );
}
