"use client";

import { FaClock, FaFire, FaInbox } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CardSpotlight } from "./ui/card-spotlight";
import StatCardSkeleton from "./skeleton/stat-card";
import type { Stats } from "../../generated/prisma";

interface StatsOverviewProps {
  stats: Stats | null;
  loading: boolean;
}

export default function StatsOverview(props: StatsOverviewProps) {
  // Show skeleton while loading
  if (props.loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCardSkeleton className="bg-gradient-to-br from-blue-900/30 to-blue-800/30" />
        <StatCardSkeleton className="bg-gradient-to-br from-green-900/30 to-green-800/30" />
        <StatCardSkeleton className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30" />
      </div>
    );
  }

  // Show error only when not loading AND stats is null
  if (!props.loading && !props.stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-red-900/50 to-red-800/50 border-none p-0 h-max">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-20">
            <CardTitle className="text-sm font-medium text-red-100">
              Error Loading Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-20">
            <div className="text-lg font-medium text-white">
              Unable to load statistics
            </div>
            <p className="text-xs text-red-300">
              Please try refreshing the page
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show stats when available
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <CardSpotlight className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-none p-0 h-max">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-20">
          <CardTitle className="text-sm font-medium text-blue-100">
            Total Processed
          </CardTitle>
          <FaInbox className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent className="relative z-20">
          <div className="text-2xl font-bold text-white z-20">
            {props.stats?.totalProcessed || 0}
          </div>
          <p className="text-xs text-blue-300 z-20">
            {props.stats?.processedToday || 0} today
          </p>
        </CardContent>
      </CardSpotlight>

      <CardSpotlight className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-none p-0 h-max">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-20">
          <CardTitle className="text-sm font-medium text-green-100">
            Avg. Time
          </CardTitle>
          <FaClock className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent className="relative z-20">
          <div className="text-2xl font-bold text-white">
            {props.stats?.averageTime || 0}s
          </div>
          <p className="text-xs text-green-300">per email</p>
        </CardContent>
      </CardSpotlight>

      <CardSpotlight className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 border-none p-0 h-max">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-20">
          <CardTitle className="text-sm font-medium text-cyan-100">
            Streak
          </CardTitle>
          <FaFire className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent className="relative z-20">
          <div className="text-2xl font-bold text-white">
            {props.stats?.streak || 0} day
            {(props.stats?.streak || 0) !== 1 ? "s" : ""}
          </div>
          <p className="text-xs text-cyan-300">
            {(props.stats?.streak || 0) > 1
              ? "Keep it going!"
              : "Start your streak!"}
          </p>
        </CardContent>
      </CardSpotlight>
    </div>
  );
}
