import { settingsAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { Button } from "./ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface ActiveSessionProps {
  setIsSessionActive: (started: boolean) => void;
}

export default function ActiveSession({
  setIsSessionActive,
}: ActiveSessionProps) {
  const settings = useAtomValue(settingsAtom);
  const user = useUser().user;

  if (!user) return;

  const handleEndSession = () => {
    const body = {
      startTime: new Date(),
      endTime: new Date(),
      duration: 100,
      emailsProcessed: 10,
      archived: 7,
      skipped: 0,
      deleted: 3,
      target: 10,
      userId: user.id,
    };

    // Create the session
    axios.post('/api/session', body)
      .then(response => {
        console.log('Session saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving session:', error);
      });

    setIsSessionActive(false);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Session Active</h2>
          {JSON.stringify(settings, null, 2)}
          <Button
            onClick={() => handleEndSession()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            End Session
          </Button>
        </div>
      </div>
    </>
  );
}
