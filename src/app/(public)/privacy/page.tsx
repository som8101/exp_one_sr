import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CampaignFlow",
  description: "Privacy Policy and data collection guidelines for CampaignFlow.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
      
      <article className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        
        <p>
          At CampaignFlow, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CampaignFlow and how we use it.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
        </ul>

        <h2>3. Log Files</h2>
        <p>
          CampaignFlow follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
        </p>

        <h2>4. Cookies and Web Beacons</h2>
        <p>
          Like any other website, CampaignFlow uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2>5. Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
        </p>
      </article>
    </div>
  );
}
