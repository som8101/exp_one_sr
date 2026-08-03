"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertOctagon, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 text-center">
      <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center mb-8">
        <AlertOctagon className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Something went wrong!</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        An unexpected error has occurred on our servers. We've been notified and are looking into it.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          <RotateCcw className="mr-2 h-4 w-4" /> Try again
        </Button>
        <Button render={<Link href="/" />} nativeButton={false} variant="outline">
          Return to Homepage
        </Button>
      </div>
    </div>
  );
}
