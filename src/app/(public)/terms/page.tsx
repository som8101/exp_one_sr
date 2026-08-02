import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | CampaignFlow",
  description: "Terms and conditions for using CampaignFlow.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Terms & Conditions</h1>
      
      <article className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using CampaignFlow, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2>2. Intellectual Property Rights</h2>
        <p>
          Other than the content you own, under these Terms, CampaignFlow and/or its licensors own all the intellectual property rights and materials contained in this Website.
        </p>

        <h2>3. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>publishing any Website material in any other media without credit</li>
          <li>selling, sublicensing and/or otherwise commercializing any Website material</li>
          <li>publicly performing and/or showing any Website material</li>
          <li>using this Website in any way that is or may be damaging to this Website</li>
        </ul>

        <h2>4. No warranties</h2>
        <p>
          This Website is provided "as is," with all faults, and CampaignFlow express no representations or warranties, of any kind related to this Website or the materials contained on this Website.
        </p>
      </article>
    </div>
  );
}
