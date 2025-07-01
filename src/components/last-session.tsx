"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  FaArchive,
  FaTrash,
  FaClock,
  FaInbox,
  FaPlay,
  FaCalendarAlt,
  FaStopwatch,
  FaForward,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Session } from "../../generated/prisma";
import LastSessionSkeleton from "./skeleton/last-session";
import { formatDate, formatDuration } from "@/lib/date";
import { useSessionStore } from "@/store/sessions";

export default function LastSession() {
  const [lastSession, setLastSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const overwriteSessions = useSessionStore((state) => state.overwriteSessions);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/session");
        overwriteSessions(response.data || []);
        setLastSession(response.data[0] || null);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [overwriteSessions]);

  // Show loading skeleton
  if (loading) {
    return <LastSessionSkeleton />;
  }

  // No Last Session State
  if (!lastSession) {
    return (
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="p-4 rounded-full bg-gray-800/50">
              <FaInbox className="text-gray-400 text-2xl" />
            </div>
          </div>
          <CardTitle className="text-white text-lg">No Sessions Yet</CardTitle>
          <div className="text-sm text-gray-400">
            Start your first email triaging session to see your recent activity
            here.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-white font-semibold py-3 text-md transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            size="lg"
            asChild
          >
            <Link href="/triage">
              <FaPlay className="inline mr-2" />
              Go to Triage Page
            </Link>
          </Button>

          {/* Helpful tips */}
          <div className="bg-gray-800/30 rounded-lg p-3">
            <h4 className="text-white text-sm font-medium mb-2">
              💡 Quick Tips
            </h4>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>
                • <b>Archive</b> emails you might need later
              </li>
              <li>
                • <b>Delete</b> emails you&apos;ll never need
              </li>
              <li>
                • <b>Skip</b> emails you want to come back to later
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sessionActions = [
    {
      action: "Archived",
      count: lastSession.archived || 0,
      icon: FaArchive,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      action: "Deleted",
      count: lastSession.deleted || 0,
      icon: FaTrash,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      action: "Skipped",
      count: lastSession.skipped || 0,
      icon: FaForward,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
  ];

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
          <span className="text-white font-semibold">
            {lastSession.emailsProcessed}
          </span>{" "}
          emails
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Session Metadata */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt className="h-3 w-3" />
              <span>Date</span>
            </div>
            <span className="text-white font-medium">
              {formatDate(lastSession.startTime)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <FaStopwatch className="h-3 w-3" />
              <span>Duration</span>
            </div>
            <span className="text-white font-medium">
              {formatDuration(lastSession.duration)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600"></div>

        {/* Session Actions */}
        <div className="space-y-2">
          {sessionActions.map((activity, index) => (
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
        </div>
      </CardContent>
    </Card>
  );
}
