import {
  Laptop,
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export type InstructionBlock =
  | { type: "text"; title: string; body: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "tips"; title: string; items: string[] }
  | { type: "note"; title: string; body: string; tone?: "info" | "warn" };

export type InstructionSection = {
  id: string;
  title: string;
  blocks: InstructionBlock[];
};

export type InstructionTopic = {
  id: string;
  label: string;
  summary: string;
  icon: React.ReactNode;
  sections: InstructionSection[];
};

export const instructionTopics: InstructionTopic[] = [
  {
    id: "learning-access",
    label: "Learning & Access",
    summary: "How to access courses, study effectively, and fix common issues.",
    icon: <Laptop size={18} />,
    sections: [
      {
        id: "access-course",
        title: "How do I access my course after purchase?",
        blocks: [
          {
            type: "list",
            title: "Quick steps",
            items: [
              "Go to **My Courses** to find your purchased courses.",
              "Make sure you’re logged into the **same account** used for checkout.",
              "Refresh the page if the course doesn’t appear immediately.",
            ],
          },
          {
            type: "note",
            tone: "warn",
            title: "If the course still doesn’t show",
            body: "Contact Support and include: course name + purchase email + a screenshot/receipt (if available).",
          },
        ],
      },
      {
        id: "study-better",
        title: "How to study without getting overwhelmed",
        blocks: [
          {
            type: "text",
            title: "Simple rule",
            body: "Consistency beats intensity. 30–60 minutes daily is better than 5 hours once a week.",
          },
          {
            type: "tips",
            title: "Practical tips",
            items: [
              "After each lesson: build a small mini-task (10–15 minutes).",
              "Keep a note of errors you faced and how you fixed them.",
              "If you’re stuck for 20+ minutes: write the exact issue and ask Support.",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "certificate",
    label: "Certificate",
    summary: "Requirements, what’s included, and how to make sure your name is correct.",
    icon: <BadgeCheck size={18} />,
    sections: [
      {
        id: "earn-certificate",
        title: "How do I earn the certificate?",
        blocks: [
          {
            type: "list",
            title: "Requirements",
            items: [
              "Complete the required lessons for the course.",
              "Finish the final project/assessment (if the course includes one).",
              "Ensure your **Profile name** is correct — it appears on the certificate.",
            ],
          },
          {
            type: "note",
            title: "Important",
            body: "Update your name in Profile before requesting/issuing the certificate.",
          },
        ],
      },
      {
        id: "certificate-includes",
        title: "What does the certificate include?",
        blocks: [
          {
            type: "list",
            title: "Usually includes",
            items: [
              "Your name (from your Profile).",
              "Course name and completion date.",
              "Verification reference (if enabled by the platform).",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "payments",
    label: "Payments & Billing",
    summary: "How checkout works, common payment issues, and what to do next.",
    icon: <CreditCard size={18} />,
    sections: [
      {
        id: "how-payment-works",
        title: "How does payment work?",
        blocks: [
          {
            type: "list",
            title: "Steps",
            items: [
              "Add courses to your cart.",
              "Go to Checkout and complete payment.",
              "After a successful payment, access is granted automatically.",
            ],
          },
          {
            type: "note",
            title: "Tip",
            body: "Before paying, double-check the course name and price in the Cart.",
          },
        ],
      },
      {
        id: "paid-no-access",
        title: "Payment succeeded but I don’t have access",
        blocks: [
          {
            type: "list",
            title: "Try this first",
            items: [
              "Refresh the page and check **My Courses**.",
              "Confirm you’re in the same account used to pay.",
              "If still missing: contact Support with your purchase email + course name.",
            ],
          },
          {
            type: "note",
            tone: "warn",
            title: "Sync delay",
            body: "Sometimes access sync may take a few minutes depending on the payment provider.",
          },
        ],
      },
    ],
  },

  {
    id: "platform-policy",
    label: "Platform Policy",
    summary: "Fair use, privacy basics, and rules that keep learning safe and respectful.",
    icon: <ShieldCheck size={18} />,
    sections: [
      {
        id: "fair-use",
        title: "Fair use & content policy",
        blocks: [
          {
            type: "list",
            title: "Allowed / Not allowed",
            items: [
              "✅ Allowed: personal learning and building projects.",
              "❌ Not allowed: sharing paid content publicly or redistributing it.",
              "❌ Not allowed: bypassing access restrictions or abusing the platform.",
            ],
          },
          {
            type: "note",
            tone: "warn",
            title: "Warning",
            body: "Violations may result in account suspension to protect creators and learners.",
          },
        ],
      },
      {
        id: "terms-privacy",
        title: "Where to read the full policy",
        blocks: [
          {
            type: "text",
            title: "Documents",
            body: "You can review full platform rules in **Terms** and **Privacy** pages.",
          },
        ],
      },
    ],
  },

  {
    id: "support",
    label: "Support & Help",
    summary: "How to ask for help in a way that gets you a fast, accurate solution.",
    icon: <Headphones size={18} />,
    sections: [
      {
        id: "support-request",
        title: "How to write a perfect support request",
        blocks: [
          {
            type: "list",
            title: "Always include",
            items: [
              "What you expected vs what happened.",
              "Course name and where it happened (page/step).",
              "Screenshots (if possible).",
              "Your device + browser (Chrome/Firefox/etc).",
            ],
          },
          {
            type: "tips",
            title: "To get a faster fix",
            items: [
              "Copy the error message exactly (don’t rewrite it).",
              "Mention whether it happens every time or only sometimes.",
              "Try another browser and tell Support what changed.",
            ],
          },
        ],
      },
      {
        id: "quick-fixes",
        title: "Quick fixes before contacting us",
        blocks: [
          {
            type: "list",
            title: "Quick checklist",
            items: [
              "Log out and log in again.",
              "Clear cache and reload the page.",
              "Try an incognito window (to rule out extensions).",
            ],
          },
          {
            type: "note",
            title: "Still stuck?",
            body: "Send us the details and we’ll help you step-by-step.",
          },
        ],
      },
    ],
  },
];
