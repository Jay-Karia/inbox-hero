"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  FaInbox,
  FaArchive,
  FaTrash,
  FaClock,
  FaTrophy,
  FaFire,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";

// Mock data
const mockStats = {
  totalEmails: 147,
  processedToday: 23,
  averageTime: 18, // seconds
  streak: 7, // days
  efficiency: 85, // percentage
  totalSaved: 142, // minutes saved this week
};

const mockRecentActivity = [
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">
              Total Processed
            </CardTitle>
            <FaInbox className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {mockStats.totalEmails}
            </div>
            <p className="text-xs text-blue-300">
              +{mockStats.processedToday} today
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
              {mockStats.averageTime}s
            </div>
            <p className="text-xs text-green-300">per email</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 border-orange-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">
              Streak
            </CardTitle>
            <FaFire className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {mockStats.streak} days
            </div>
            <p className="text-xs text-orange-300">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">
              Time Saved
            </CardTitle>
            <FaTrophy className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {mockStats.totalSaved}m
            </div>
            <p className="text-xs text-purple-300">this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Action Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Start Session Card */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <FaInbox className="text-blue-400" />
              Ready for your next session?
            </CardTitle>
            <CardDescription className="text-gray-300">
              You have{" "}
              <span className="text-white font-semibold">24 unread emails</span>{" "}
              waiting to be triaged.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Efficiency Rate</span>
                <span className="text-white">{mockStats.efficiency}%</span>
              </div>
              <Progress value={mockStats.efficiency} className="h-2" />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 text-lg"
              size="lg"
            >
              Start Triaging Emails
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockRecentActivity.map((activity, index) => (
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
                    <p className="text-gray-400 text-xs">{activity.time}</p>
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
