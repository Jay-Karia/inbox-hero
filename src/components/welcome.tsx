"use client";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FaArchive,
  FaTrash,
  FaTrophy,
  FaFire,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import StartSession from "./start-session";
import { mockStatsType } from "@/types/data";
import StatsOverview from "./stats-overview";

// Mock data
const mockStats: mockStatsType = {
  totalEmails: 147,
  unreadEmails: 80, // total unread emails at the start of the day
  processedToday: 20, // emails processed today
  averageTime: 18, // seconds
  streak: 8, // days
  dailyGoal: 50, // daily goal of emails
};

const mockLastSession = [
  {
    action: "Archived",
    count: 12,
    time: "2 hours ago",
    icon: FaArchive,
    color: "text-blue-400",
  },
  {
    action: "Deleted",
    count: 8,
    time: "4 hours ago",
    icon: FaTrash,
    color: "text-red-400",
  },
  {
    action: "Replied",
    count: 3,
    time: "6 hours ago",
    icon: FaEnvelope,
    color: "text-green-400",
  },
];

const mockAchievements = [
  {
    title: "Speed Demon",
    description: "Process 20+ emails in under 30 seconds each",
    icon: FaFire,
    unlocked: true,
  },
  {
    title: "Inbox Zero",
    description: "Clear your entire inbox",
    icon: FaCheckCircle,
    unlocked: false,
  },
  {
    title: "Week Warrior",
    description: "Maintain 7-day streak",
    icon: FaTrophy,
    unlocked: true,
  },
];

export default function Welcome() {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <div className="relative z-10 text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {getGreeting()}, {user?.firstName}! 👋
        </h1>
        <p className="text-xl text-gray-300">Ready to conquer your inbox?</p>
      </div>

      {/* Stats Overview */}
      <StatsOverview mockStats={mockStats}/>

      {/* Main Action Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Start Session */}
        <StartSession mockStats={mockStats} />

        {/* Recent Activity */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Last Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockLastSession.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {activity.action}
                    </p>
                    {/* <p className="text-gray-400 text-xs">{activity.time}</p> */}
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gray-700 text-gray-200"
                >
                  {activity.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <FaTrophy className="text-yellow-400" />
            Achievements
          </CardTitle>
          <CardDescription className="text-gray-300">
            Track your email management milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAchievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-600"
                    : "bg-gray-800/30 border-gray-600"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <achievement.icon
                    className={`h-6 w-6 ${
                      achievement.unlocked ? "text-yellow-400" : "text-gray-500"
                    }`}
                  />
                  <h3
                    className={`font-semibold ${
                      achievement.unlocked ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {achievement.title}
                  </h3>
                </div>
                <p
                  className={`text-sm ${
                    achievement.unlocked ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
