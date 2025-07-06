import {Email} from "@/types/emails";
import { Settings } from "@/types/settings";

export const DEFAULT_SETTINGS: Settings = {
  duration: 25,
  target: 50,
  progressBar: true,
  showTimer: true,
  soundEffects: false,
  endlessMode: false,
};

export const QUICK_SPRINT: Settings = {
  duration: 15,
  target: 25,
  showTimer: true,
  soundEffects: false,
  progressBar: true,
  endlessMode: false,
};

export const FOCUSED_SESSION: Settings = {
  duration: 30,
  target: 50,
  showTimer: true,
  soundEffects: false,
  progressBar: true,
  endlessMode: false,
};

export const POWER_HOUR: Settings = {
  duration: 60,
  target: 100,
  showTimer: true,
  soundEffects: true,
  progressBar: true,
  endlessMode: false,
};

export const mockEmails: Email[] = [
  {
    id: 1,
    subject: "Meeting Reminder",
    body: "Don't forget about the meeting tomorrow at 10 AM.",
  },
  {
    id: 2,
    subject: "Project Update",
    body: "The project is on track for completion by the end of the month.",
  },
  {
    id: 3,
    subject: "Newsletter Subscription",
    body: "Thank you for subscribing to our newsletter! Stay tuned for updates.",
  },
  {
    id: 4,
    subject: "Feedback Request",
    body: "We would love to hear your feedback on our latest product release.",
  }
]
