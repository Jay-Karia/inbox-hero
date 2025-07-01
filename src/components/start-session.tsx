import { QUICK_SPRINT, FOCUSED_SESSION, POWER_HOUR } from "@/constants";
import { Label } from "@radix-ui/react-label";
import { FaPlay, FaBolt, FaThLarge, FaRocket } from "react-icons/fa";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Settings } from "@/types/settings";

interface StartSessionProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  handleStartSession: (settings: Settings) => void;
}

export default function StartSession(props: StartSessionProps) {
  return (
    <>
      <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <FaPlay className="text-green-400 h-5 w-5" />
            </div>
            Start Your Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Preview */}
          <div className="space-y-4 p-4 bg-gray-800/30 rounded-lg">
            <h4 className="text-white font-medium">Session Preview</h4>
            {props.settings.endlessMode ? (
              <div className="text-gray-400">
                <p className="mb-2">You are in Endless Mode.</p>
                <p className="text-sm">
                  In this mode, you can triage emails without a time limit or
                  target. Focus on clearing your inbox at your own pace.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Duration:</span>
                  <span className="text-blue-400 font-medium">{props.settings.duration}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Target:</span>
                  <span className="text-green-400 font-medium">{props.settings.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Timer:</span>
                  <span className={props.settings.showTimer ? "text-green-400" : "text-red-400"}>
                    {props.settings.showTimer ? "On" : "Off"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sounds:</span>
                  <span className={props.settings.soundEffects ? "text-green-400" : "text-red-400"}>
                    {props.settings.soundEffects ? "On" : "Off"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <Label className="text-white font-medium">Quick Presets</Label>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 justify-start py-[1.30rem]"
                onClick={() => props.setSettings(QUICK_SPRINT)}
              >
                <FaBolt className="mr-2 h-4 w-4 text-yellow-400" />
                <div className="text-left">
                  <div className="font-medium">Quick Sprint</div>
                  <div className="text-xs text-gray-400">
                    {QUICK_SPRINT.duration} min • {QUICK_SPRINT.target} emails
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 justify-start py-[1.30rem]"
                onClick={() => props.setSettings(FOCUSED_SESSION)}
              >
                <FaThLarge className="mr-2 h-4 w-4 text-blue-400" />
                <div className="text-left">
                  <div className="font-medium">Focused Session</div>
                  <div className="text-xs text-gray-400">
                    {FOCUSED_SESSION.duration} min • {FOCUSED_SESSION.target} emails
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 justify-start py-[1.30rem]"
                onClick={() => props.setSettings(POWER_HOUR)}
              >
                <FaRocket className="mr-2 h-4 w-4 text-green-400" />
                <div className="text-left">
                  <div className="font-medium">Power Hour</div>
                  <div className="text-xs text-gray-400">
                    {POWER_HOUR.duration} min • {POWER_HOUR.target} emails
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Start Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3"
            onClick={() => props.handleStartSession(props.settings)}
          >
            <FaPlay className="mr-2 h-5 w-5" />
            Start Triage Session
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
