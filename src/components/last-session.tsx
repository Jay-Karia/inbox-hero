"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaArchive, FaTrash, FaEnvelope, FaClock } from "react-icons/fa";

export default function LastSession() {
  const mockLastSession = [
    {
      action: "Archived",
      count: 12,
      icon: FaArchive,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      action: "Deleted",
      count: 8,
      icon: FaTrash,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      action: "Replied",
      count: 3,
      icon: FaEnvelope,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
  ];

  const totalProcessed = mockLastSession.reduce(
    (sum, activity) => sum + activity.count,
    0
  );

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <FaClock className="text-blue-400" />
          Last Session
        </CardTitle>
        <div className="text-sm text-gray-400">
          Processed{" "}
          <span className="text-white font-semibold">{totalProcessed}</span>{" "}
          emails
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockLastSession.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${activity.bgColor}`}>
                <activity.icon className={`h-3 w-3 ${activity.color}`} />
              </div>
              <span className="text-white text-sm font-medium">
                {activity.action}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-gray-700/60 text-gray-200 font-semibold"
            >
              {activity.count}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
