"use client";

import { QUICK_SPRINT, FOCUSED_SESSION, POWER_HOUR } from "@/constants";
import { Label } from "@radix-ui/react-label";
import { FaPlay, FaBolt, FaThLarge, FaRocket, FaClock, FaVolumeUp, FaInfinity, FaMailBulk, FaStopwatch } from "react-icons/fa";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Settings } from "@/types/settings";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface StartSessionProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  handleStartSession: (settings: Settings) => void;
}

export default function StartSession(props: StartSessionProps) {
  const presets = [
    {
      name: "Quick Sprint",
      settings: QUICK_SPRINT,
      icon: FaBolt,
      color: "text-yellow-400",
      description: "Fast & focused"
    },
    {
      name: "Focused Session",
      settings: FOCUSED_SESSION,
      icon: FaThLarge,
      color: "text-blue-400",
      description: "Balanced approach"
    },
    {
      name: "Power Hour",
      settings: POWER_HOUR,
      icon: FaRocket,
      color: "text-green-400",
      description: "Maximum productivity"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900/70 via-slate-800/60 to-gray-900/80 border-gray-700/50 shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-3 text-lg">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <FaPlay className="text-green-400 h-4 w-4" />
          </div>
          Start Your Session
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Session Preview */}
        <div className="space-y-3 p-4 bg-white/3 backdrop-blur-md rounded-lg">
          <div className="flex items-center gap-2">
            <h4 className="text-white font-medium">Session Preview</h4>
            {props.settings.endlessMode && (
              <Badge className="bg-blue-500/10 text-blue-300 border-blue-700/40 hover:text-blue-900 hover:bg-blue-200">
                <FaInfinity className="mr-1 h-3 w-3" />
                Endless
              </Badge>
            )}
          </div>

          {props.settings.endlessMode ? (
            <div className="text-gray-400 text-sm">
              <p className="mb-2">Endless Mode - no time limits or targets.</p>
              <p>Focus on clearing your inbox at your own pace.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2 rounded">
                <div className="flex items-center gap-2">
                  <FaStopwatch className="h-3 w-3 text-blue-400" />
                  <span className="text-gray-300 text-sm">Duration</span>
                </div>
                <span className="text-blue-400 font-medium text-sm">
                  {props.settings.duration}m
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded">
                <div className="flex items-center gap-2">
                  <FaMailBulk className="h-3 w-3 text-green-400" />
                  <span className="text-gray-300 text-sm">Target</span>
                </div>
                <span className="text-green-400 font-medium text-sm">
                  {props.settings.target}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded">
                <div className="flex items-center gap-2">
                  <FaClock className="h-3 w-3 text-purple-400" />
                  <span className="text-gray-300 text-sm">Timer</span>
                </div>
                <span className={`font-medium text-sm ${
                  props.settings.showTimer ? "text-green-400" : "text-red-400"
                }`}>
                  {props.settings.showTimer ? "On" : "Off"}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded">
                <div className="flex items-center gap-2">
                  <FaVolumeUp className="h-3 w-3 text-orange-400" />
                  <span className="text-gray-300 text-sm">Sounds</span>
                </div>
                <span className={`font-medium text-sm ${
                  props.settings.soundEffects ? "text-green-400" : "text-red-400"
                }`}>
                  {props.settings.soundEffects ? "On" : "Off"}
                </span>
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-gray-700/40" />

        {/* Quick Presets */}
        <div className="space-y-4">
          <Label className="text-gray-200 font-medium flex items-center gap-2">
            <FaRocket className="h-4 w-4 text-purple-400" />
            Quick Presets
          </Label>

          <div className="grid grid-cols-1 gap-3">
            {presets.map((preset, index) => {
              const Icon = preset.icon;
              return (
          <Button
            key={index}
            variant="ghost"
                  size="sm"
                  className="justify-start p-1 py-[0.4rem] h-auto bg-gray-800/50 hover:bg-gray-800/70 border-gray-700/60 hover:border-gray-600/80 transition-colors cursor-pointer"
                  onClick={() => props.setSettings(preset.settings)}
                >
                  <Icon className={`mr-3 h-4 w-4 ${preset.color}`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white">{preset.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                      <span>{preset.description}</span>
                      <span>•</span>
                      <span>{preset.settings.duration}m</span>
                      <span>•</span>
                      <span>{preset.settings.target} emails</span>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white font-bold py-[1.30rem] text-lg transition-all duration-300 hover:shadow-lg cursor-pointer"
          onClick={() => props.handleStartSession(props.settings)}
        >
          <FaPlay className="mr-2 h-5 w-5" />
          Start Triage Session
        </Button>
      </CardContent>
    </Card>
  );
}
