"use client";

import TriageSkeleton from "@/components/skeleton/triage";
import Triage from "@/components/triage";
import ActiveSession from "@/components/active-session";
import { useAtom, useSetAtom } from "jotai";
import { emailsAtom, sessionActiveAtom } from "@/atoms";
import { useUser } from "@clerk/nextjs";
import { mockEmails } from "@/constants";

export default function TriagePage() {
  const [isSessionActive, setIsSessionActive] = useAtom(sessionActiveAtom);
  const { isLoaded } = useUser();
  const setEmails = useSetAtom(emailsAtom);

  const handleStartSession = () => {
    setIsSessionActive(true);
    setEmails(mockEmails);
  };

  if (!isLoaded) {
    return <TriageSkeleton />;
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
