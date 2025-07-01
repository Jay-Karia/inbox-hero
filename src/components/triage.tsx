"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaThLarge, FaPlay, FaBolt, FaRocket } from "react-icons/fa";
import QuickSettings from "./quick-settings";
import { Settings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/constants";

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
          {/* Start Session */}
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
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">
                      {settings.duration} min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target:</span>
                    <span className="text-white">
                      {settings.target} emails
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timer:</span>
                    <span className="text-white">
                      {settings.showTimer ? "On" : "Off"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sounds:</span>
                    <span className="text-white">
                      {settings.soundEffects ? "On" : "Off"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-3">
                <Label className="text-white font-medium">Quick Presets</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 justify-start"
                    onClick={() =>
                      setSettings({
                        duration: 15,
                        target: 25,
                        showTimer: true,
                        soundEffects: false,
                        progressBar: true,
                      })
                    }
                  >
                    <FaBolt className="mr-2 h-4 w-4 text-yellow-400" />
                    <div className="text-left">
                      <div className="font-medium">Quick Sprint</div>
                      <div className="text-xs text-gray-400">
                        15 min • 25 emails
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 justify-start"
                    onClick={() =>
                      setSettings({
                        duration: 30,
                        target: 50,
                        showTimer: true,
                        soundEffects: true,
                        progressBar: true,
                      })
                    }
                  >
                    <FaThLarge className="mr-2 h-4 w-4 text-blue-400" />
                    <div className="text-left">
                      <div className="font-medium">Focused Session</div>
                      <div className="text-xs text-gray-400">
                        30 min • 50 emails
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 justify-start"
                    onClick={() =>
                      setSettings({
                        duration: 60,
                        target: 100,
                        showTimer: true,
                        soundEffects: true,
                        progressBar: true,
                      })
                    }
                  >
                    <FaRocket className="mr-2 h-4 w-4 text-green-400" />
                    <div className="text-left">
                      <div className="font-medium">Power Hour</div>
                      <div className="text-xs text-gray-400">
                        60 min • 100 emails
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Start Button */}
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3"
                onClick={() => handleStartSession(settings)}
              >
                <FaPlay className="mr-2 h-5 w-5" />
                Start Triage Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
