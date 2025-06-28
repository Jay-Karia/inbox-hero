"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import StartSession from "./start-session";
import { mockStatsType } from "@/types/data";
import StatsOverview from "./stats-overview";
import LastSession from "./last-session";

// Mock data
const mockStats: mockStatsType = {
  totalEmails: 147,
  unreadEmails:80, // total unread emails at the start of the day
  processedToday: 20, // emails processed today
  averageTime: 18, // seconds
  streak: 8, // days
  dailyGoal: 50, // daily goal of emails
};

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
      <StatsOverview mockStats={mockStats} />

      {/* Main Action Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Start Session */}
        <StartSession mockStats={mockStats} />

        {/* Last Session */}
        <LastSession />
      </div>

      {/* Achievements Section */}

    </div>
  );
}
