import { FaInbox, FaMailBulk } from "react-icons/fa";
import { CardContent } from "./ui/card";
import { CardSpotlight } from "./ui/card-spotlight";
import { useEffect, useState } from "react";
import axios from "axios";
import { Stats } from "../../generated/prisma";

export default function EmailsSummary() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        <div className="h-28 bg-gray-700 rounded-lg"></div>
        <div className="h-28 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <>
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardSpotlight className="bg-gray-900 border-gray-800 p-0">
            <CardContent className="p-4 text-center z-20 relative">
              <div className="flex justify-center mb-2">
                <FaMailBulk className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {stats.unreadEmails}
              </div>
              <div className="text-xs text-gray-400">Unread Emails</div>
            </CardContent>
          </CardSpotlight>

          <CardSpotlight className="bg-gray-900 border-gray-800 p-0">
            <CardContent className="p-4 text-center z-20 relative">
              <div className="flex justify-center mb-2">
                <FaInbox className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-xl font-bold text-white">
                <span className="text-2xl">{stats.processedToday}</span>/
                <span className="text-sm">{stats.dailyGoal}</span>
              </div>
              <div className="text-xs text-gray-400">Daily Goal</div>
            </CardContent>
          </CardSpotlight>
        </div>
      ) : (
        <>
          <div className="text-center text-gray-400">
            <p>Could not load emails summary.</p>
            <p className="mt-2">Try refreshing the page.</p>
          </div>
        </>
      )}
    </>
  );
}
