"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function CustomActionButton({ 
  children, 
  url, 
  useLoading 
}: { 
  children: React.ReactNode, 
  url: string, 
  useLoading: boolean 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (useLoading) {
      setIsLoading(true);
    }
    
    if (url.startsWith("http")) {
      window.location.href = url;
    } else {
      router.push(url);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading} className="my-2">
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
