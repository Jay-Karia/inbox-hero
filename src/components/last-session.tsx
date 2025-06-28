"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FaArchive, FaTrash, FaEnvelope, FaClock, FaInbox, FaPlay } from "react-icons/fa";
import Link from "next/link";

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

  // Set to true to test no session state
  const hasLastSession = false;

  const totalProcessed = mockLastSession.reduce(
    (sum, activity) => sum + activity.count,
    0
  );

  if (!hasLastSession) {
    // No Last Session State
    return (
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="p-4 rounded-full bg-gray-800/50">
              <FaInbox className="text-gray-400 text-2xl" />
            </div>
          </div>
          <CardTitle className="text-white text-lg">
            No Sessions Yet
          </CardTitle>
          <div className="text-sm text-gray-400">
            Start your first email triaging session to see your recent activity here.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-white font-semibold py-3 text-md transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            size="lg"
            asChild
          >
            <Link href="/triage">
              <FaPlay className="mr-2 h-3 w-3" />
              Start Your First Session
            </Link>
          </Button>

          {/* Helpful tips */}
          <div className="bg-gray-800/30 rounded-lg p-3">
            <h4 className="text-white text-sm font-medium mb-2">💡 Quick Tips</h4>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>• <b>Archive</b> emails you might need later</li>
              <li>• <b>Delete</b> emails you&apos;ll never need</li>
              <li>• <b>Reply</b> to urgent messages quickly</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Regular Last Session State
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

        {/* Session Summary */}
        <div className="mt-4 pt-3 border-t border-gray-600">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Session Total</span>
            <span className="text-white font-bold">{totalProcessed} emails</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
