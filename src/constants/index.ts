import {Email} from "@/types/email";
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
    from: "sarah.manager@company.com",
    to: "you@company.com",
  },
  {
    id: 2,
    subject: "Project Update",
    body: "The project is on track for completion by the end of the month.",
    from: "project.team@company.com",
    to: "you@company.com",
  },
  {
    id: 3,
    subject: "Newsletter Subscription",
    body: "Thank you for subscribing to our newsletter! Stay tuned for updates.",
    from: "newsletter@techblog.com",
    to: "you@company.com",
  },
  {
    id: 4,
    subject: "Feedback Request",
    body: "We would love to hear your feedback on our latest product release.",
    from: "feedback@productcorp.com",
    to: "you@company.com",
  },
  {
    id: 5,
    subject: "Invoice Reminder",
    body: "This is a reminder that your invoice is due next week.",
    from: "billing@serviceprovider.com",
    to: "you@company.com",
  },
  {
    id: 6,
    subject: "Social Media Update",
    body: "Check out our latest post on social media!",
    from: "social@brandcompany.com",
    to: "you@company.com",
  },
  {
    id: 7,
    subject: "Event Invitation",
    body: "You are invited to our upcoming event next month.",
    from: "events@conference.org",
    to: "you@company.com",
  },
  {
    id: 8,
    subject: "Password Reset",
    body: "Click here to reset your password.",
    from: "security@platform.com",
    to: "you@company.com",
  },
  {
    id: 9,
    subject: "Weekly Digest",
    body: "Here's your weekly digest of important updates.",
    from: "digest@newsservice.com",
    to: "you@company.com",
  },
  {
    id: 10,
    subject: "Thank You",
    body: "Thank you for being a valued customer!",
    from: "support@retailstore.com",
    to: "you@company.com",
  },
  {
    id: 11,
    subject: "System Alert",
    body: "Your system has detected unusual activity. Please check your settings.",
    from: "alerts@security.com",
    to: "you@company.com",
  },
  {
    id: 12,
    subject: "New Feature Announcement",
    body: "We are excited to announce a new feature that will enhance your experience.",
    from: "product@softwarecompany.com",
    to: "you@company.com",
  },
  {
    id: 13,
    subject: "Survey Invitation",
    body: "We invite you to participate in our survey to help us improve our services.",
    from: "research@surveycompany.com",
    to: "you@company.com",
  },
]
