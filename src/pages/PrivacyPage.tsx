import { privacyContent } from "../data/legal";
import LegalPagesLayout from "../layouts/LegalPagesLayout";

export default function PrivacyPage() {
  return (
    <LegalPagesLayout title="Privacy Policy" description="How Learnify handles your data — what we collect, why we collect it, and your controls."
      sections={privacyContent}
    />
  );
}
