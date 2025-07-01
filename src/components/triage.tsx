"use client";

import { useState } from "react";
import QuickSettings from "./quick-settings";
import { Settings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/constants";
import StartSession from "./start-session";

interface TriageProps {
  handleStartSession: (settings: unknown) => void;
}

export default function Triage({ handleStartSession }: TriageProps) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
      </div>
    </div>
  );
}
