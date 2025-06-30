"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import StatsOverview from "./stats-overview";
import LastSession from "./last-session";
import axios from "axios";
import StartSession from "./start-session";

export default function Welcome() {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

      <StatsOverview stats={stats} loading={loading} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <StartSession stats={stats} loading={loading} />
        <LastSession />
      </div>
    </div>
  );
}

// TODO: fix the layout shift when the user name loads
