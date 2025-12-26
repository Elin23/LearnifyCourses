import { termsContent } from "../data/legal";
import LegalPagesLayout from "../layouts/LegalPagesLayout";

export default function TermsPage() {
  return (
    <LegalPagesLayout title="Terms & Conditions" description="The rules for using Learnify — accounts, payments, certificates, and platform usage."
      sections={termsContent}
    />
  );
}
