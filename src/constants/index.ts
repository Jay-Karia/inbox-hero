import { Settings } from "@/types/settings";

export const DEFAULT_SETTINGS: Settings = {
  duration: 25,
  target: 50,
  progressBar: true,
  showTimer: true,
  soundEffects: false,
};

export const QUICK_SPRINT: Settings = {
  duration: 15,
  target: 25,
  showTimer: true,
  soundEffects: false,
  progressBar: true,
};

export const FOCUSED_SESSION: Settings = {
  duration: 30,
  target: 50,
  showTimer: true,
  soundEffects: false,
  progressBar: true,
};

export const POWER_HOUR: Settings = {
  duration: 60,
  target: 100,
  showTimer: true,
  soundEffects: true,
  progressBar: true,
};
