import { settingsAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { Button } from "./ui/button";

interface ActiveSessionProps {
  setIsSessionActive: (started: boolean) => void;
}

export default function ActiveSession({
  setIsSessionActive,
}: ActiveSessionProps) {
  const settings = useAtomValue(settingsAtom);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Session Active</h2>
          {JSON.stringify(settings, null, 2)}
          <Button
            onClick={() => setIsSessionActive(false)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            End Session
          </Button>
        </div>
      </div>
    </>
  );
}
