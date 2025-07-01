import { FaClock, FaThLarge, FaVolumeUp, FaChartLine } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Settings } from "@/types/settings";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import React from "react";
import { IconType } from "react-icons/lib";

interface QuickSettingsProps {
  settings: Settings;
  handleSettingChange: (key: keyof Settings, value: unknown) => void;
}

export default function QuickSettings(props: QuickSettingsProps) {
  const toggleSettings: {
    key: keyof Settings;
    label: string;
    icon: IconType;
  }[] = [
    { key: "showTimer", label: "Show Timer", icon: FaClock },
    { key: "soundEffects", label: "Sound Effects", icon: FaVolumeUp },
    { key: "progressBar", label: "Progress Bar", icon: FaChartLine },
  ];
  return (
    <>
      <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <FaClock className="text-purple-400 h-5 w-5" />
            </div>
            Quick Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Duration Slider */}
          <div className="space-y-3">
            <Label className="text-white font-medium flex items-center gap-2">
              <FaClock className="h-4 w-4 text-blue-400" />
              Session Duration:{" "}
              <span className="text-blue-400">
                {props.settings.duration} min
              </span>
            </Label>
            <Slider
              value={[props.settings.duration]}
              onValueChange={(value: unknown[]) =>
                props.handleSettingChange("duration", value[0])
              }
              min={10}
              max={60}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10 min</span>
              <span>30 min</span>
              <span>60 min</span>
            </div>
          </div>

          {/* Email Target */}
          <div className="space-y-3">
            <Label className="text-white font-medium flex items-center gap-2">
              <FaThLarge className="h-4 w-4 text-green-400" />
              Email Target:{" "}
              <span className="text-green-400">{props.settings.target}</span>
            </Label>
            <Slider
              value={[props.settings.target]}
              onValueChange={(value: unknown[]) =>
                props.handleSettingChange("target", value[0])
              }
              min={10}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          <Separator className="bg-gray-600/50" />

          {/* Feature Toggles */}
          <div className="grid grid-cols-1 gap-3">
            {toggleSettings.map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/40"
              >
                <Label
                  htmlFor={key}
                  className="text-white flex items-center gap-2 cursor-pointer"
                >
                  <Icon className="h-4 w-4 text-gray-400" />
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
        </CardContent>
      </Card>
    </>
  );
}
