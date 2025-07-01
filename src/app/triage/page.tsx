"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import TriageSkeleton from "@/components/skeleton/triage";
import Triage from "@/components/triage";

export default function TriagePage() {
  const { isLoaded } = useUser();
  const [sessionStarted, setSessionStarted] = useState(false);

  const handleStartSession = (settings: unknown) => {
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl text-white mb-4">Session Active</h2>
            <button
              onClick={() => setSessionStarted(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              End Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
