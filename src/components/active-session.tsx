import { useAtom, useAtomValue } from "jotai";
import {
  afterSessionPopUpsAtom,
  emailsAtom,
  settingsAtom,
  statsAtom,
} from "@/atoms";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Session, Stats } from "../../generated/prisma";
import { updateStatsData, updateStreak } from "@/lib/utils";
import { toast } from "sonner";
import { FaArchive, FaClock, FaForward, FaTrash } from "react-icons/fa";
import { HiOutlineCheck } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Timer from "./ui/timer";

interface ActiveSessionProps {
  setIsSessionActive: (started: boolean) => void;
}

export default function ActiveSession({
  setIsSessionActive,
}: ActiveSessionProps) {
  const [emails, setEmails] = useAtom(emailsAtom);
  const settings = useAtomValue(settingsAtom);
  const user = useUser().user;
  const [currentStats, setStats] = useAtom(statsAtom);
  const [afterSessionPopUps, setAfterSessionPopUps] = useAtom(
    afterSessionPopUpsAtom
  );
  const [loading, setLoading] = useState(false);

  // Store the initial number of emails and start time
  const [initialEmailCount, setInitialEmailCount] = useState(emails.length);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [actionStats, setActionStats] = useState({
    archived: 0,
    skipped: 0,
    deleted: 0,
  });

  useEffect(() => {
    // Set the initial email count and start time only once when the session starts
    if (!startTime) {
      setInitialEmailCount(emails.length);
      setStartTime(new Date());
    }
  }, [emails, startTime]);

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

  const handleEndSession = async () => {
    if (!startTime) return;

    setLoading(true);

    // Calculate session duration
    const endTime = new Date();
    const duration = Math.round(
      (endTime.getTime() - startTime.getTime()) / 1000
    );

    const sessionData = {
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
    } as Session;

    // Update the stats
    let statsData: Stats = updateStatsData(currentStats, sessionData, user?.id);
    const previousStreak = statsData.streak;
    statsData = updateStreak(statsData);

    // Check for pop-ups
    const openedToday = afterSessionPopUps.openedToday;
    if (!openedToday) {
      const isDailyGoalAchieved =
        statsData.processedToday >= statsData.dailyGoal;
      const streakUpdated = statsData.streak > previousStreak;

      setAfterSessionPopUps({
        dailyGoal: isDailyGoalAchieved,
        streak: streakUpdated,
        openedToday: false,
      });
    }

    // Check for any api errors
    let isError = false;

    // Create the session
    await axios.post("/api/session", sessionData).catch((error) => {
      toast.error("Could not save session", {
        description: "Stats will not be updated either.",
      });
      isError = true;
      console.error("Error saving session:", error);
    });

    // Do not update stats if there was an error saving the session
    if (!isError) {
      // Update the stats
      await axios
        .patch("/api/stats", statsData)
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => {
          toast.error("Could not update stats");
          isError = true;
          console.error("Error updating stats:", error);
        });
    }

    // Show the toast if no error occurred
    if (!isError) {
      toast.success("Session and stats updated successfully");
    }

    setLoading(false);
    setIsSessionActive(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 flex flex-col">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-8">
        {/* Header Section with Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Progress Card */}
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-700/50">
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium flex items-center">
                <HiOutlineCheck className="mr-2" size={16} />
                Progress
              </span>
              <div className="mt-1">
                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-300">
                    {processedEmails}/{initialEmailCount}
                  </span>
                  <span className="text-gray-400">{progress.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Target Card */}
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-700/50">
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium">Target</span>
              <div className="flex items-end justify-between">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">
                    {settings.target}
                  </span>
                  <span className="text-gray-400 ml-2 text-sm">emails</span>
                </div>
                {targetAchieved && (
                  <span className="text-sm px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-medium">
                    Achieved! 🎉
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Timer Card */}
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-700/50">
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium flex items-center">
                <FaClock className="mr-2" size={14} />
                Timer
              </span>
              <div className="text-3xl font-bold text-white">
                {startTime && (
                  <Timer
                    durationMinutes={settings.duration}
                    onTimeUp={handleEndSession}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email Card */}
        <AnimatePresence mode="wait">
          {emails.length > 0 ? (
            <motion.div
              key={emails[0].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/50 overflow-hidden"
            >
              {/* Target Achieved Banner */}
              {targetAchieved && (
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-white font-medium text-center">
                  🎉 Target Achieved! Keep going to process more emails.
                </div>
              )}

              {/* Email Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {emails[0].subject}
                </h3>
                <div className="border-l-4 border-gray-600 pl-4 py-1 mb-4">
                  <p className="text-gray-400 text-sm">From: {emails[0].from}</p>
                  <p className="text-gray-400 text-sm">
                    To: {emails[0].to || "me"}
                  </p>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {emails[0].body}
                </p>
              </div>

              {/* Actions */}
              <div className="bg-gray-900/50 p-5 flex flex-wrap gap-4 justify-end border-t border-gray-700/50">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAction("archived")}
                  className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium shadow-lg hover:shadow-green-500/20 hover:shadow-xl flex items-center gap-2 transition-all"
                >
                  <FaArchive size={16} />
                  Archive
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAction("skipped")}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-blue-500/20 hover:shadow-xl flex items-center gap-2 transition-all"
                >
                  <FaForward size={16} />
                  Skip
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAction("deleted")}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-lg hover:shadow-red-500/20 hover:shadow-xl flex items-center gap-2 transition-all"
                >
                  <FaTrash size={16} />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-gray-700/50 text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <HiOutlineCheck size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  All emails processed!
                </h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Great job! You&apos;ve completed your session and processed{" "}
                  <span className="text-white font-medium">
                    {initialEmailCount}
                  </span>{" "}
                  emails.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* End Session Button */}
        <div className="flex justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEndSession}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium shadow-lg flex items-center gap-2 ${
              loading
                ? "bg-gray-700 text-gray-300"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-red-500/20 hover:shadow-xl"
            } transition-all`}
          >
            {loading ? "Ending Session..." : "End Session"}
          </motion.button>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mt-2"
        >
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-gray-400 text-xs uppercase font-medium mb-1">Archived</div>
            <div className="text-xl font-bold text-white">{actionStats.archived}</div>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-gray-400 text-xs uppercase font-medium mb-1">Skipped</div>
            <div className="text-xl font-bold text-white">{actionStats.skipped}</div>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-gray-400 text-xs uppercase font-medium mb-1">Deleted</div>
            <div className="text-xl font-bold text-white">{actionStats.deleted}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
