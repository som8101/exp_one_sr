import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CampaignCardProps = {
  campaign: any; // We'll type this broadly for reuse. Prisma includes pages & categories
  layout?: "grid" | "horizontal";
};

export function CampaignCard({ campaign, layout = "grid" }: CampaignCardProps) {
  // Calculate reading time (approx 200 words per minute)
  const calculateReadingTime = () => {
    if (!campaign.pages || campaign.pages.length === 0) return 1;
    const totalWords = campaign.pages.reduce((acc: number, page: any) => {
      const text = page.content.replace(/<[^>]*>?/gm, ''); // strip HTML
      return acc + (text.split(/\s+/).length || 0);
    }, 0);
    return Math.max(1, Math.ceil(totalWords / 200));
  };

  const readingTime = calculateReadingTime();
  
  // Use first category if available
  const categoryName = campaign.categories && campaign.categories.length > 0 
    ? campaign.categories[0].name 
    : "Uncategorized";

  if (layout === "horizontal") {
    return (
      <Card className="flex flex-col sm:flex-row overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="relative w-full sm:w-1/3 h-48 sm:h-auto bg-muted/20 overflow-hidden">
          {campaign.featuredImage ? (
            <Image 
              src={campaign.featuredImage} 
              alt={campaign.name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
              <span className="text-muted-foreground/30 font-bold text-4xl">{campaign.name.substring(0, 1)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="font-semibold text-primary uppercase tracking-wider">{categoryName}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readingTime} min read</span>
          </div>
          <Link href={`/c/${campaign.slug}`}>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {campaign.seoTitle || campaign.name}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-2 mb-4 text-sm flex-1">
            {campaign.seoDescription || "Read more about this topic..."}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-4 w-4" /> 
              <span>Editor</span>
            </div>
            <span className="text-xs">{format(new Date(campaign.createdAt), "MMM d, yyyy")}</span>
          </div>
        </div>
      </Card>
    );
  }

  // Default Grid Layout
  return (
    <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-48 bg-muted/20 overflow-hidden border-b">
        {campaign.featuredImage ? (
          <Image 
            src={campaign.featuredImage} 
            alt={campaign.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
             <span className="text-muted-foreground/30 font-bold text-6xl">{campaign.name.substring(0, 1)}</span>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
          {categoryName}
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readingTime} min read</span>
          <span>•</span>
          <span>{format(new Date(campaign.createdAt), "MMM d, yyyy")}</span>
        </div>
        <CardTitle className="line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          <Link href={`/c/${campaign.slug}`}>
            {campaign.seoTitle || campaign.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {campaign.seoDescription || "Explore this comprehensive guide covering all the details you need to know."}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between border-t mt-auto px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-4 w-4" /> 
          <span>Editor</span>
        </div>
        <Button render={<Link href={`/c/${campaign.slug}`} />} nativeButton={false} variant="ghost" size="sm" className="gap-1 -mr-3 group-hover:text-primary">
          Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
