import { FaClock, FaThLarge } from "react-icons/fa";
import { Session } from "../../generated/prisma";
import { Card, CardContent } from "./ui/card";

interface SessionsSummaryProps {
  sessions: Session[];
}

export default function SessionsSummary({ sessions }: SessionsSummaryProps) {
  return (
    <div>
      {sessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <FaClock className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {/* {sessionStats.totalProcessed} */}
              </div>
              <div className="text-xs text-gray-400">Average Duration</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <FaThLarge className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {/* {sessionStats.totalSessions} */}
              </div>
              <div className="text-xs text-gray-400">Total Sessions</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <FaClock className="h-5 w-5 text-orange-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {/* {sessionStats.totalSessions > 0
              ? Math.round(
                  (sessionStats.completedSessions /
                    sessionStats.totalSessions) *
                    100
                )
              : 0}
            % */}
              </div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </CardContent>
          </Card>
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
