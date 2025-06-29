"use client";

import { FaInbox, FaCheckCircle, FaShare } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import Link from "next/link";
import StartSessionSkeleton from "./skeleton/start-session";
import type { Stats } from "../../generated/prisma";

interface StartSessionProps {
  stats: Stats | null;
  loading: boolean;
}

export default function StartSession(props: StartSessionProps) {
  // Show skeleton while loading
  if (props.loading) {
    return <StartSessionSkeleton />;
  }

  // Show error state if no stats and not loading
  if (!props.loading && !props.stats) {
    return (
      <Card className="lg:col-span-2 bg-gradient-to-br from-red-900/50 to-red-800/50 border-red-700">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl">
            Unable to Load Data
          </CardTitle>
          <CardDescription className="text-red-200">
            Please refresh the page to try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </CardContent>
      </Card>
    );
  }

  function calculateProgress(processed: number, goal: number): number {
    const rawProgress = Math.round((processed / goal) * 100);

    if (goal === 0 && goal >= processed) return 0;
    if (goal === 0 && goal < processed) return 100;

    return rawProgress > 100 ? 100 : rawProgress;
  }

  const mockProgress = calculateProgress(
    props.stats?.processedToday || 0,
    props.stats?.dailyGoal || 50
  );
  const hasUnreadEmails = (props.stats?.unreadEmails || 0) > 0;

  if (!hasUnreadEmails) {
    // Inbox Zero State
    return (
      <Card className="lg:col-span-2 bg-gradient-to-br from-green-900/50 to-emerald-800/50 border-green-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <FaCheckCircle className="text-green-400 text-4xl" />
            </div>
          </div>
          <CardTitle className="text-white text-xl">
            🎉 Inbox Zero Achieved!
          </CardTitle>
          <CardDescription className="text-green-100">
            Congratulations! You&apos;ve cleared all your emails. Take a moment
            to celebrate this achievement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Daily Goal Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-200">
                Daily Goal - <b>{props.stats?.processedToday || 0}</b>/
                {props.stats?.dailyGoal || 50}
              </span>
              <span className="text-white">{mockProgress}%</span>
            </div>
            <Progress value={mockProgress} className="h-2" />
          </div>

          {/* Action Options */}
          <div className="grid grid-cols-1 gap-3">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-md transition-all duration-200 shadow-lg hover:shadow-xl"
              size="lg"
              asChild
            >
              <Link href="/triage">
                <FaInbox className="mr-1" />
                Check for New Emails
              </Link>
            </Button>
          </div>

          {/* Motivational Message */}
          <div className="text-center mt-4 p-3 bg-green-800/30 rounded-lg">
            <p className="text-green-100 text-sm">
              {mockProgress >= 100
                ? "Amazing! You've exceeded your daily goal and achieved Inbox Zero!"
                : `You're ${
                    100 - mockProgress
                  }% away from your daily goal. New emails will help you reach it!`}
            </p>
          </div>
        </CardContent>
        <CardContent className="pt-0">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
            >
              <FaShare className="mr-1" />
              Share Achievement
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Regular state with unread emails
  return (
    <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          <FaInbox className="text-blue-400" />
          Ready for your next session?
        </CardTitle>
        <CardDescription className="text-gray-300">
          You have{" "}
          <span className="text-white font-semibold">
            {props.stats?.unreadEmails || 0} unread email
            {(props.stats?.unreadEmails || 0) !== 1 ? "s" : ""}
          </span>{" "}
          waiting to be triaged.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              Daily Goal - <b>{props.stats?.processedToday || 0}</b>/
              {props.stats?.dailyGoal || 50}
            </span>
            <span className="text-white">{mockProgress}%</span>
          </div>
          <Progress value={mockProgress} className="h-2" />
        </div>
        <Button
          className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-white font-semibold py-3 text-md transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          size="lg"
          asChild
        >
          <Link href="/triage">Start Triaging</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
