import { FaInbox, FaMailBulk } from "react-icons/fa";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { statsAtom } from "@/atoms";

export default function EmailsSummary() {
  const [stats, setStats] = useAtom(statsAtom);
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
  }, [setStats]);

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
          <Card className="bg-gray-900 border-gray-800 p-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/5 to-emerald-900/5">
              <div
                className="h-full relative"
                style={{
                  width: "100%",
                  background: `linear-gradient(to right, rgba(34, 197, 94, ${Math.min(
                    (stats.unreadEmails / 100) * 0.1,
                    0.1
                  )}), rgba(5, 150, 105, ${Math.min(
                    (stats.unreadEmails / 100) * 0.1,
                    0.1
                  )}))`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              </div>
            </div>
            <CardContent className="p-4 text-center z-20 relative">
              <div className="flex justify-center mb-2">
                <FaMailBulk className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-xl font-bold text-white">
                {stats.unreadEmails}
              </div>
              <div className="text-xs text-gray-400">Unread Emails</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/5 to-purple-900/5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10  relative"
                style={{
                  width: `${Math.min(
                    (stats.processedToday / stats.dailyGoal) * 100,
                    100
                  )}%`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              </div>
            </div>

            <CardContent className="p-4 text-center z-20 relative group">
              <div className="flex justify-center mb-2">
                <FaInbox className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-xl font-bold text-white relative">
                <span className="text-2xl">{stats.processedToday}</span>
                <span className="text-gray-500 mx-1">/</span>
                <span className="text-sm text-gray-300">{stats.dailyGoal}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1 relative">
                Daily Goal
              </div>
            </CardContent>
          </Card>
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
