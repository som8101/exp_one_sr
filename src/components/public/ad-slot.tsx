"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AdSlotProps = {
  className?: string;
  placement: "HEADER" | "FOOTER" | "SIDEBAR" | "INLINE";
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
};

export function AdSlot({ className, placement, format = "auto" }: AdSlotProps) {
  const [isAdsenseReady, setIsAdsenseReady] = useState(false);

  // In the future, toggle this to true when AdSense is approved
  const isAdsEnabled = false; 

  useEffect(() => {
    if (isAdsEnabled) {
      // Logic to initialize AdSense goes here later
      setIsAdsenseReady(true);
    }
  }, [isAdsEnabled]);

  if (!isAdsEnabled) {
    // Return a transparent placeholder so the layout doesn't break
    // when ads are eventually turned on.
    return (
      <div 
        className={cn(
          "w-full flex items-center justify-center border border-dashed rounded-md bg-muted/20 text-muted-foreground/30 text-xs",
          className
        )}
        title={`AdSlot Placeholder: ${placement}`}
      >
        <span className="sr-only">Advertisement Space ({placement})</span>
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-hidden flex justify-center", className)}>
      {/* 
        Future AdSense Code:
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format={format}
          data-full-width-responsive="true"></ins>
      */}
      <div className="w-full h-full bg-muted/10 animate-pulse rounded-md" />
    </div>
  );
}
