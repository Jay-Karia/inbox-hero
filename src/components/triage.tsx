"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { sessionsAtom } from "@/atoms/sessions";
import QuickSettings from "./quick-settings";
import { Settings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/constants";
import StartSession from "./start-session";
import AllSessions from "./all-sessions";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { FaEnvelope, FaThLarge, FaClock } from "react-icons/fa";

interface TriageProps {
  handleStartSession: (settings: unknown) => void;
}

export default function Triage({ handleStartSession }: TriageProps) {
  const sessions = useAtomValue(sessionsAtom);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Calculate real stats from sessions
  const sessionStats = {

  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Session Summary */}
        {sessions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  <FaClock className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-xl font-bold text-white">
                  {/* {sessionStats.totalProcessed} */}
                </div>
                <div className="text-xs text-gray-400">Average Duration</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  <FaThLarge className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-xl font-bold text-white">
                  {/* {sessionStats.totalSessions} */}
                </div>
                <div className="text-xs text-gray-400">Total Sessions</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  <FaClock className="h-5 w-5 text-orange-400" />
                </div>
                <div className="text-xl font-bold text-white">
                  {/* {sessionStats.totalSessions > 0
                    ? Math.round(
                        (sessionStats.completedSessions /
                          sessionStats.totalSessions) *
                          100
                      )
                    : 0}
                  % */}
                </div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Separator className="my-8 bg-gray-800" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuickSettings
            settings={settings}
            handleSettingChange={handleSettingChange}
          />
          <StartSession
            settings={settings}
            handleStartSession={handleStartSession}
            setSettings={setSettings}
          />
        </div>

        <Separator className="my-8 bg-gray-800" />

        <AllSessions />
      </div>
    </div>
  );
}
