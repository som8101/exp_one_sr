"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function AnalyticsTracker({ campaignId }: { campaignId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Generate or get visitor ID
    let visitorId = localStorage.getItem("cf_visitor_id");
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("cf_visitor_id", visitorId);
    }

    const pageUrl = window.location.href;
    const referrer = document.referrer;
    const browser = navigator.userAgent;

    // Fire and forget analytics event
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        campaignId,
        pageUrl,
        visitorId,
        referrer,
        browser,
      }),
    }).catch(console.error);
    
  }, [pathname, searchParams, campaignId]);

  return null; // Hidden component
}
