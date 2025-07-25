"use client";

import {
  FaClock,
  FaVolumeUp,
  FaChartLine,
  FaInfinity,
  FaRegQuestionCircle,
  FaMailBulk,
  FaStopwatch,
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
import { Button } from "./ui/button";

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
    {
      key: "showTimer",
      label: "Show Timer",
      icon: FaClock,
      color: "text-blue-400",
    },
    {
      key: "soundEffects",
      label: "Sound Effects",
      icon: FaVolumeUp,
      color: "text-green-400",
    },
    {
      key: "progressBar",
      label: "Progress Bar",
      icon: FaChartLine,
      color: "text-purple-400",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900/70 via-slate-800/60 to-gray-900/80 border-gray-700/50 shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-3 text-lg">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <FaGear className="text-purple-400 h-4 w-4" />
          </div>
          Quick Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* TODO: add custom values */}
        {/* Duration Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-gray-200 font-medium flex items-center gap-2">
              <FaStopwatch className="h-4 w-4 text-blue-400" />
              Duration
            </Label>
            <span className="text-blue-400 font-medium text-sm bg-blue-500/10 px-2 py-1 rounded">
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
            className="w-full cursor-grab"
            disabled={props.settings.endlessMode}
          />
          <div className="flex gap-2 mt-2 justify-between">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50"
                onClick={() =>
                  props.handleSettingChange(
                    "duration",
                    Math.min(255, props.settings.duration + 1)
                  )
                }
                disabled={props.settings.endlessMode}
              >
                +1
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50"
                onClick={() =>
                  props.handleSettingChange(
                    "duration",
                    Math.min(255, props.settings.duration + 5)
                  )
                }
                disabled={props.settings.endlessMode}
              >
                +5
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50"
                onClick={() =>
                  props.handleSettingChange(
                    "duration",
                    Math.min(255, props.settings.duration + 10)
                  )
                }
                disabled={props.settings.endlessMode}
              >
                +10
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50"
              onClick={() =>
                props.handleSettingChange(
                  "duration",
                  Math.max(1, props.settings.duration - 1)
                )
              }
              disabled={props.settings.endlessMode}
            >
              -1
            </Button>
          </div>
        </div>

        {/* Email Target */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-gray-200 font-medium flex items-center gap-2">
              <FaMailBulk className="h-4 w-4 text-green-400" />
              Target
            </Label>
            <span className="text-green-400 font-medium text-sm bg-green-500/10 px-2 py-1 rounded">
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
            className="w-full cursor-grab"
            disabled={props.settings.endlessMode}
          />
          <div className="flex gap-2 mt-2 justify-between">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50"
                onClick={() =>
                  props.handleSettingChange("target", Math.min(255, props.settings.target + 1))
                }
                disabled={props.settings.endlessMode}
              >
                +1
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50"
                onClick={() =>
                  props.handleSettingChange("target", Math.min(255, props.settings.target + 5))
                }
                disabled={props.settings.endlessMode}
              >
                +5
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50"
                onClick={() =>
                  props.handleSettingChange(
                    "target",
                    Math.min(255, props.settings.target + 10)
                  )
                }
                disabled={props.settings.endlessMode}
              >
                +10
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50"
              onClick={() =>
                props.handleSettingChange("target", Math.max(1, props.settings.target - 1))
              }
              disabled={props.settings.endlessMode}
            >
              -1
            </Button>
          </div>
        </div>

        <Separator className="bg-gray-700/40" />

        {/* Feature Toggles */}
        <div className="space-y-3">
          {toggleSettings.map(({ key, label, icon: Icon, color }) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 py-4 rounded-lg bg-gray-800/45 hover:bg-gray-800/65 transition-colors"
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
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-900/40 via-blue-800/35 to-indigo-900/45">
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
