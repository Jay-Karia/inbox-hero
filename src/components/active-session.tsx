import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import Timer from "./ui/timer";
import { useAtom, useAtomValue } from "jotai";
import { emailsAtom, settingsAtom } from "@/atoms";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Session, Stats } from "../../generated/prisma";
import { updateStatsData } from "@/lib/utils";

interface ActiveSessionProps {
  setIsSessionActive: (started: boolean) => void;
}

export default function ActiveSession({
  setIsSessionActive,
}: ActiveSessionProps) {
  const [emails, setEmails] = useAtom(emailsAtom);
  const settings = useAtomValue(settingsAtom);
  const user = useUser().user;
  const [currentStats, setStats] = useState<Stats | null>(null);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [actionStats, setActionStats] = useState({
    archived: 0,
    skipped: 0,
    deleted: 0,
  });

  // Store the initial number of emails at the start of the session
  const [initialEmailCount, setInitialEmailCount] = useState(emails.length);

  useEffect(() => {
    // Set the initial email count only once when the session starts
    if (emails.length > 0 && initialEmailCount === 0) {
      setInitialEmailCount(emails.length);
    }
    setStartTime(new Date());
  }, [emails, initialEmailCount]);

  // Calculate progress dynamically
  const processedEmails = initialEmailCount - emails.length;
  const progress = Math.min(100, (processedEmails / initialEmailCount) * 100);
  const targetAchieved = processedEmails >= settings.target;

  const handleAction = (actionType: "archived" | "skipped" | "deleted") => {
    // Remove the first email from the list
    setEmails((prevEmails) => prevEmails.slice(1));

    // Update action stats
    setActionStats((prevStats) => ({
      ...prevStats,
      [actionType]: prevStats[actionType] + 1,
    }));
  };

  const handleEndSession = () => {
    // Mock session data
    const endTime = new Date();
    const duration = Math.round(
      (endTime.getTime() - startTime.getTime()) / 1000
    );

    const sessionData: Session = {
      id: 0, // Temporary ID for new session
      startTime,
      endTime,
      duration,
      emailsProcessed: processedEmails,
      archived: actionStats.archived,
      skipped: actionStats.skipped,
      deleted: actionStats.deleted,
      target: settings.target,
      userId: user?.id || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create the session
    axios
      .post("/api/session", sessionData)
      .then((response) => {
        console.log("Session saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving session:", error);
      });

    // Update the stats
    const statsData: Partial<Stats> = updateStatsData(
      currentStats!,
      sessionData,
      user?.id
    );

    // Update the stats
    axios
      .patch("/api/stats", statsData)
      .then((response) => {
        console.log("Stats updated successfully:", response.data);
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Error updating stats:", error);
      });

    setIsSessionActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-6 gap-6">
      {/* Session Header */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white">Active Session</h2>
        <p className="text-gray-400">Focus on processing your emails!</p>

        {/* Progress Bar */}
        <div className="mt-4">
          <p className="text-sm text-gray-400">Progress</p>
          <Progress value={progress} className="h-4 mt-2" />
          <p className="text-sm text-gray-400 mt-2">
            {progress.toFixed(0)}% completed ({processedEmails}/
            {initialEmailCount} emails processed)
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Target: {settings.target} emails
          </p>
        </div>

        {/* Timer */}
        <div className="mt-4">
          <p className="text-sm text-gray-400">Session Timer</p>
          <Timer
            durationMinutes={settings.duration}
            onTimeUp={handleEndSession}
          />
        </div>
      </div>

      {/* Email Card */}
      {emails.length > 0 ? (
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Target Achieved Message */}
          {targetAchieved && (
            <div className="mb-4 p-4 bg-green-700 rounded-lg text-white text-center">
              🎉 Target Achieved! Keep going to process more emails.
            </div>
          )}

          {/* Current Email */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">
              {emails[0].subject}
            </h3>
            <p className="text-gray-300">{emails[0].body}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => {
                handleAction("archived");
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md font-medium shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Archive
            </Button>
            <Button
              onClick={() => {
                handleAction("skipped");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md font-medium shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Skip
            </Button>
            <Button
              onClick={() => {
                handleAction("deleted");
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md font-medium shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            All emails processed!
          </h3>
          <p className="text-gray-300">
            Great job! You’ve completed your session.
          </p>
        </div>
      )}

      {/* End Session Button */}
      <Button
        onClick={handleEndSession}
        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md font-medium shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        End Session
      </Button>
    </div>
  );
}
