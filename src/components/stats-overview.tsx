import { FaClock, FaFire, FaInbox } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { mockStatsType } from "@/types/data";

interface StatsOverviewProps {
  mockStats: mockStatsType;
}

export default function StatsOverview(props: StatsOverviewProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">
              Total Processed
            </CardTitle>
            <FaInbox className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {props.mockStats.totalEmails}
            </div>
            <p className="text-xs text-blue-300">
              +{props.mockStats.processedToday} today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">
              Avg. Time
            </CardTitle>
            <FaClock className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {props.mockStats.averageTime}s
            </div>
            <p className="text-xs text-green-300">per email</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 border-cyan-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-100">
              Streak
            </CardTitle>
            <FaFire className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {props.mockStats.streak} day
              {props.mockStats.streak !== 1 ? "s" : ""}
            </div>
            <p className="text-xs text-cyan-300">
              {props.mockStats.streak > 1
                ? "Keep it going!"
                : "Start your streak!"}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
