"use client";

import {
  FaClock,
  FaVolumeUp,
  FaChartLine,
  FaInfinity,
  FaRegQuestionCircle,
  FaMailBulk,
} from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Settings } from "@/types/settings";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import React from "react";
import { IconType } from "react-icons/lib";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { FaGear } from "react-icons/fa6";

interface QuickSettingsProps {
  settings: Settings;
  handleSettingChange: (key: keyof Settings, value: unknown) => void;
}

export default function QuickSettings(props: QuickSettingsProps) {
  const toggleSettings: {
    key: keyof Settings;
    label: string;
    icon: IconType;
    color: string;
  }[] = [
    { key: "showTimer", label: "Show Timer", icon: FaClock, color: "text-blue-400" },
    { key: "soundEffects", label: "Sound Effects", icon: FaVolumeUp, color: "text-green-400" },
    { key: "progressBar", label: "Progress Bar", icon: FaChartLine, color: "text-purple-400" },
  ];

  return (
    <Card className="bg-gray-900/60 border-gray-700/50 shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-3 text-lg">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <FaGear className="text-purple-400 h-4 w-4" />
          </div>
          Quick Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Duration Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-gray-200 font-medium flex items-center gap-2">
              <FaClock className="h-4 w-4 text-blue-400" />
              Duration
            </Label>
            <span className="text-blue-400 font-semibold text-sm bg-blue-500/10 px-2 py-1 rounded">
              {props.settings.duration}m
            </span>
          </div>
          <Slider
            value={[props.settings.duration]}
            onValueChange={(value: unknown[]) =>
              props.handleSettingChange("duration", value[0])
            }
            min={5}
            max={60}
            step={5}
            className="w-full"
            disabled={props.settings.endlessMode}
          />
        </div>

        {/* Email Target */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-gray-200 font-medium flex items-center gap-2">
              <FaMailBulk className="h-4 w-4 text-green-400" />
              Target
            </Label>
            <span className="text-green-400 font-semibold text-sm bg-green-500/10 px-2 py-1 rounded">
              {props.settings.target}
            </span>
          </div>
          <Slider
            value={[props.settings.target]}
            onValueChange={(value: unknown[]) =>
              props.handleSettingChange("target", value[0])
            }
            min={5}
            max={100}
            step={5}
            className="w-full"
            disabled={props.settings.endlessMode}
          />
        </div>

        <Separator className="bg-gray-700/40" />

        {/* Feature Toggles */}
        <div className="space-y-3">
          {toggleSettings.map(({ key, label, icon: Icon, color }) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
            >
              <Label
                htmlFor={key}
                className="text-gray-200 flex items-center gap-3 cursor-pointer"
              >
                <Icon className={`h-4 w-4 ${color}`} />
                {label}
              </Label>
              <Switch
                id={key}
                checked={props.settings[key as keyof Settings] as boolean}
                onCheckedChange={(checked: boolean) =>
                  props.handleSettingChange(key, checked)
                }
              />
            </div>
          ))}
        </div>

          {/* Endless Mode */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-blue-900/40">
            <Label
              htmlFor="endlessMode"
              className="text-white flex items-center gap-2 cursor-pointer"
            >
              <FaInfinity className="h-4 w-4 text-blue-300" />
              Endless Mode
              <Tooltip>
                <TooltipTrigger asChild>
                  <FaRegQuestionCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm text-center">
                  <p>
                    When enabled, the session will continue indefinitely until
                    manually stopped or ran out of unread emails.
                  </p>
                </TooltipContent>
              </Tooltip>
            </Label>
            <Switch
              id="endlessMode"
              checked={props.settings.endlessMode}
              onCheckedChange={(checked: boolean) =>
                props.handleSettingChange("endlessMode", checked)
              }
            />
          </div>
        </CardContent>
      </Card>
  );
}
