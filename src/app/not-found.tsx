import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 text-center">
      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-8">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4">
        <Button render={<Link href="/" />} nativeButton={false} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back Home
        </Button>
        <Button render={<Link href="/search" />} nativeButton={false}>
          Search Content
        </Button>
      </div>
    </div>
  );
}
