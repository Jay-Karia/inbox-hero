"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import TriageSkeleton from "@/components/skeleton/triage";
import Triage from "@/components/triage";
import { Settings } from "@/types/settings";
import ActiveSession from "@/components/active-session";

export default function TriagePage() {
  const { isLoaded } = useUser();
  const [sessionStarted, setSessionStarted] = useState(false);

  const handleStartSession = (settings: Settings) => {
    console.log("Starting session with settings:", settings);
    setSessionStarted(true);
  };

  if (!isLoaded) {
    return <TriageSkeleton />;
  }

  return (
    <div className="min-h-screen">
      {!sessionStarted ? (
        <Triage handleStartSession={handleStartSession} />
      ) : (
        <ActiveSession setSessionStarted={setSessionStarted} />
      )}
    </div>
  );
}
