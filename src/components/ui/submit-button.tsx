"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isSuccess?: boolean;
  defaultText: string;
  loadingText?: string;
  successText?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
}

export function SubmitButton({
  isLoading = false,
  isSuccess = false,
  defaultText,
  loadingText = "Saving...",
  successText = "Saved!",
  className,
  variant = "default",
  size = "default",
  ...props
}: SubmitButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2500); // Show "Saved!" for 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <Button
      type="submit"
      variant={showSuccess ? "outline" : variant}
      size={size}
      disabled={isLoading || showSuccess || props.disabled}
      className={cn(
        "transition-all duration-200",
        showSuccess && "border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950/30",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : showSuccess ? (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          {successText}
        </>
      ) : (
        defaultText
      )}
    </Button>
  );
}
