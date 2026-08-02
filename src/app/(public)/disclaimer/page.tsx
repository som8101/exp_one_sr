import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | CampaignFlow",
  description: "Legal disclaimer for CampaignFlow content.",
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Disclaimer</h1>
      
      <article className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        
        <h2>General Information</h2>
        <p>
          The information provided by CampaignFlow on our website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
        </p>

        <h2>Professional Disclaimer</h2>
        <p>
          The Site cannot and does not contain financial, legal, or professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.
        </p>

        <h2>External Links Disclaimer</h2>
        <p>
          The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.
        </p>
      </article>
    </div>
  );
}
