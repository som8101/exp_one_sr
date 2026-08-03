import { getCampaignBySlug } from "@/actions/public";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, Clock, User, Share2, List } from "lucide-react";
import { TwitterIcon, FacebookIcon, LinkedinIcon } from "@/components/public/social-icons";
import { AnalyticsTracker } from "@/components/shared/analytics-tracker";
import { AdSlot } from "@/components/public/ad-slot";
import { CampaignCard } from "@/components/public/campaign-card";

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ p?: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const campaign = await getCampaignBySlug(resolvedParams.slug);
  
  if (!campaign) return { title: "Campaign Not Found" };

  let title = campaign.seoTitle || campaign.name;
  let description = campaign.seoDescription;

  if (resolvedSearchParams.p) {
    const pageIndex = parseInt(resolvedSearchParams.p, 10) - 1;
    if (pageIndex >= 0 && pageIndex < campaign.pages.length) {
      const page = campaign.pages[pageIndex];
      if (page.seoTitle) title = page.seoTitle;
      if (page.seoDescription) description = page.seoDescription;
    }
  }
  
  return {
    title,
    description,
    openGraph: {
      title,
      description: description || undefined,
      images: campaign.featuredImage ? [{ url: campaign.featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || undefined,
      images: campaign.featuredImage ? [campaign.featuredImage] : [],
    }
  };
}

export default async function CampaignViewerPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ p?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const campaign = await getCampaignBySlug(resolvedParams.slug);
  
  if (!campaign) {
    notFound();
  }

  const pageIndex = resolvedSearchParams.p ? parseInt(resolvedSearchParams.p, 10) - 1 : 0;
  
  if (pageIndex < 0 || pageIndex >= campaign.pages.length) {
    if (campaign.pages.length === 0) {
      return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">{campaign.name}</h1>
            <p className="text-muted-foreground mb-8">This article is being written. Check back later!</p>
            <Button render={<Link href="/" />} nativeButton={false}>
              Back to Home
            </Button>
          </div>
        </div>
      );
    }
    notFound();
  }

  const currentPage = campaign.pages[pageIndex];
  const hasNextPage = pageIndex < campaign.pages.length - 1;
  const hasPrevPage = pageIndex > 0;
  
  // Calculate read time for the whole campaign (all pages)
  const totalWords = campaign.pages.reduce((acc: number, page: any) => {
    const text = page.content.replace(/<[^>]*>?/gm, '');
    return acc + (text.split(/\s+/).length || 0);
  }, 0);
  const readingTime = Math.max(1, Math.ceil(totalWords / 200));

  const categoryName = campaign.categories && campaign.categories.length > 0 
    ? campaign.categories[0].name 
    : "Uncategorized";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <AnalyticsTracker campaignId={campaign.id} />
      
      {/* AdSlot - Header */}
      <div className="container mx-auto py-6">
        <AdSlot placement="HEADER" className="h-[90px] max-w-[728px]" />
      </div>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-5xl mb-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 mb-10">
          <Link href={`/search?q=${categoryName.toLowerCase()}`} className="text-sm font-bold text-primary uppercase tracking-widest hover:underline">
            {categoryName}
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {campaign.name}
          </h1>
          {campaign.seoDescription && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              {campaign.seoDescription}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground pt-4 border-t w-full justify-center">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" /> <span>By Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> <span>{readingTime} min read</span>
            </div>
            <div>
              {format(new Date(campaign.createdAt), "MMM d, yyyy")}
            </div>
          </div>
        </div>

        {campaign.featuredImage && (
          <div className="relative w-full aspect-[21/9] md:aspect-[2.35/1] rounded-2xl overflow-hidden shadow-2xl mb-12">
            <Image 
              src={campaign.featuredImage} 
              alt={campaign.name}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </section>
      
      <main className="flex-1 container mx-auto px-4 max-w-6xl pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sidebar - Social Share & TOC */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> Share Article
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10 text-[#1DA1F2] border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/10"><TwitterIcon className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10 text-[#4267B2] border-[#4267B2]/20 hover:bg-[#4267B2]/10"><FacebookIcon className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10 text-[#0077B5] border-[#0077B5]/20 hover:bg-[#0077B5]/10"><LinkedinIcon className="h-4 w-4" /></Button>
                </div>
              </div>
              
              <div className="p-5 bg-background rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <List className="h-4 w-4" /> In this series
                </h3>
                <ol className="space-y-3 text-sm list-decimal list-inside">
                  {campaign.pages.map((p: any, idx: number) => (
                    <li key={p.id} className={idx === pageIndex ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground transition-colors"}>
                      <Link href={`/c/${campaign.slug}?p=${idx + 1}`}>{p.title}</Link>
                    </li>
                  ))}
                </ol>
              </div>

              <AdSlot placement="SIDEBAR" className="h-[600px] w-full" />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 max-w-3xl w-full mx-auto">
            {campaign.pages.length > 1 && (
              <div className="mb-8 text-sm font-medium text-primary bg-primary/5 inline-block px-3 py-1 rounded-full">
                Part {pageIndex + 1}: {currentPage.title}
              </div>
            )}
            
            <article className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
            </article>

            {/* AdSlot - Inline */}
            <AdSlot placement="INLINE" className="h-[250px] my-12" />

            {/* Mobile Share Buttons (Visible only on small screens) */}
            <div className="lg:hidden mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share Article
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 text-[#1DA1F2] border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/10"><TwitterIcon className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 text-[#4267B2] border-[#4267B2]/20 hover:bg-[#4267B2]/10"><FacebookIcon className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 text-[#0077B5] border-[#0077B5]/20 hover:bg-[#0077B5]/10"><LinkedinIcon className="h-4 w-4" /></Button>
              </div>
            </div>
            
            {/* Pagination Footer */}
            <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
              {hasPrevPage ? (
                <Button render={<Link href={`/c/${campaign.slug}?p=${pageIndex}`} />} nativeButton={false} variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  <ArrowLeft className="h-4 w-4" /> Previous Chapter
                </Button>
              ) : (
                <div className="hidden sm:block" />
              )}
              
              {hasNextPage ? (
                <Button render={<Link href={`/c/${campaign.slug}?p=${pageIndex + 2}`} />} nativeButton={false} size="lg" className="gap-2 w-full sm:w-auto">
                  Next Chapter <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button render={<Link href={currentPage.ctaUrl || campaign.finalCtaUrl || "/"} />} nativeButton={false} size="lg" className="gap-2 w-full sm:w-auto">
                  {currentPage.ctaText || "Finish Reading"} <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
