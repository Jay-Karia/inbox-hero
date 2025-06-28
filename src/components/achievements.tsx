"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FaTrophy, FaFire, FaCheckCircle } from "react-icons/fa";

export default function Achievements() {
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
  return (
    <>
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
    </>
  );
}
