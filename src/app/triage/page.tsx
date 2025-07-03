"use client";

import TriageSkeleton from "@/components/skeleton/triage";
import Triage from "@/components/triage";
import ActiveSession from "@/components/active-session";
import { useAtom } from "jotai";
import { sessionActiveAtom } from "@/atoms";
import ActiveSessionSkeleton from "@/components/skeleton/active-session";
import { useUser } from "@clerk/nextjs";

export default function TriagePage() {
  const [isSessionActive, setIsSessionActive] = useAtom(sessionActiveAtom);
  const { isLoaded } = useUser();

  const handleStartSession = () => {
    setIsSessionActive(true);
  };

  if (!isLoaded) {
    return isSessionActive ? <ActiveSessionSkeleton /> : <TriageSkeleton />;
  }

  return (
    <div className="min-h-screen">
      {!isSessionActive ? (
        <Triage handleStartSession={handleStartSession} />
      ) : (
        <ActiveSession setIsSessionActive={setIsSessionActive} />
      )}
    </div>
  );
}
