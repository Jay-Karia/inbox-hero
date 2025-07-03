import { settingsAtom } from "@/atoms";
import { useAtomValue } from "jotai";

interface ActiveSessionProps {
  setSessionStarted: (started: boolean) => void;
}

export default function ActiveSession({
  setSessionStarted,
}: ActiveSessionProps) {
  const settings = useAtomValue(settingsAtom);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Session Active</h2>
          {JSON.stringify(settings, null, 2)}
          <button
            onClick={() => setSessionStarted(false)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            End Session
          </button>
        </div>
      </div>
    </>
  );
}
