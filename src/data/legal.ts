export type LegalSection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
};

export const termsContent: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body:
      "By using Learnify, you agree to follow these terms. If you do not agree, please stop using the platform.",
  },
  {
    id: "accounts",
    title: "Accounts & access",
    body:
      "You are responsible for keeping your login information secure and for all activity under your account.",
    bullets: [
      "Use accurate information (especially your name for certificates).",
      "Do not share your account or resell access.",
      "We may suspend accounts that violate platform rules.",
    ],
  },
  {
    id: "payments",
    title: "Payments & refunds",
    body:
      "Payments may be required for some courses. Refund rules may depend on the course type and how much content was accessed.",
    bullets: [
      "Prices and discounts may change at any time.",
      "Refund requests are reviewed fairly based on policy and course progress.",
    ],
  },
  {
    id: "certificates",
    title: "Certificates",
    body:
      "Certificates are issued when you complete the course requirements and meet any integrity checks.",
    bullets: [
      "Your certificate name is taken from your profile.",
      "Misuse or impersonation may result in certificate revocation.",
    ],
  },
  {
    id: "content",
    title: "Content & usage",
    body:
      "All course materials are for personal learning. Copying, distributing, or uploading content elsewhere is not allowed.",
  },
  {
    id: "changes",
    title: "Changes to terms",
    body:
      "We may update these terms to reflect platform improvements. Continued use means you accept the updated terms.",
  },
];

export const privacyContent: LegalSection[] = [
  {
    id: "overview",
    title: "Privacy overview",
    body:
      "We respect your privacy. This page explains what data we store and how it may be used within Learnify.",
  },
  {
    id: "data-we-collect",
    title: "Data we collect",
    body:
      "We may collect basic account information and usage data to provide the service and improve learning experience.",
    bullets: [
      "Account info: name, email (and optional phone if you add it).",
      "Learning activity: progress, completed lessons, saved items.",
      "Technical data: device/browser info for security and performance.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your data",
    body:
      "We use your data to provide access to courses, show progress, generate certificates, and improve platform stability.",
    bullets: [
      "Account access and authentication",
      "Course progress and personalization",
      "Support and troubleshooting",
    ],
  },
  {
    id: "sharing",
    title: "Sharing your data",
    body:
      "We do not sell your personal data. We may share limited data only when needed to provide services or comply with law.",
  },
  {
    id: "your-controls",
    title: "Your controls",
    body:
      "You can update profile info, manage preferences, and request support if you need changes or deletion (when available).",
    bullets: [
      "Edit your profile details from the Profile page.",
      "Adjust preferences from the Settings page.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body:
      "We use reasonable measures to protect your data. However, no system can be 100% secure.",
  },
];
