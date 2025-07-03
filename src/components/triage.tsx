"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { sessionsAtom } from "@/atoms/sessions";
import QuickSettings from "./quick-settings";
import { Settings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/constants";
import StartSession from "./start-session";
import AllSessions from "./all-sessions";
import { Separator } from "./ui/separator";
import SessionsSummary from "./sessions-summary";
import axios from "axios";

interface TriageProps {
  handleStartSession: (settings: unknown) => void;
}

export default function Triage({ handleStartSession }: TriageProps) {
  const [sessions, setSessions] = useAtom(sessionsAtom);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("/api/session");
        setSessions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [setSessions]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <SessionsSummary sessions={sessions} />
        <Separator className="my-8 bg-gray-800" />

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
        <AllSessions sessions={sessions} />
      </div>
    </div>
  );
}
