"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  FaArchive,
  FaTrash,
  FaEnvelope,
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

export default function LastSession() {
  const [lastSession, setLastSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/session");
        setLastSession(response.data[0] || null);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Show loading skeleton
  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-700/30 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
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
              <FaPlay className="mr-2 h-3 w-3" />
              Start Your First Session
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
                • <b>Reply</b> to urgent messages quickly
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Helper functions
  const formatDate = (date: Date | string) => {
    const sessionDate = new Date(date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());

    if (sessionDay.getTime() === today.getTime()) {
      return `Today at ${sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (sessionDay.getTime() === today.getTime() - 86400000) {
      return `Yesterday at ${sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return sessionDate.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "Unknown";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

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
      action: "Replied",
      count: lastSession.replied || 0,
      icon: FaEnvelope,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
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
          <span className="text-white font-semibold">{lastSession.emailsProcessed}</span>{" "}
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
