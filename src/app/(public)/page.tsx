import Link from "next/link";
import { getPublishedCampaigns } from "@/actions/public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Mail, CheckCircle2, TrendingUp, Layers } from "lucide-react";
import { Metadata } from "next";
import { CampaignCard } from "@/components/public/campaign-card";
import { AdSlot } from "@/components/public/ad-slot";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "CampaignFlow | Expert Insights & Guides",
  description: "Discover expertly curated content, tutorials, and guides across technology, business, and lifestyle.",
  openGraph: {
    title: "CampaignFlow | Expert Insights & Guides",
    description: "Discover expertly curated content, tutorials, and guides.",
    type: "website",
  }
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const campaigns = await getPublishedCampaigns();
  
  // For demo purposes, we'll slice the campaigns into different sections
  const featuredCampaign = campaigns.length > 0 ? campaigns[0] : null;
  const latestCampaigns = campaigns.slice(1, 7);
  const trendingCampaigns = campaigns.slice(0, 3);

  const categories = [
    { name: "Technology", count: 12, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
    { name: "Business", count: 8, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
    { name: "AI & Future", count: 15, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
    { name: "Lifestyle", count: 5, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
    { name: "Programming", count: 24, color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20" },
    { name: "Education", count: 9, color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="w-full pt-16 md:pt-24 lg:pt-32 pb-12 bg-zinc-50 dark:bg-zinc-950 border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary/10 text-primary border-transparent">
              Welcome to CampaignFlow
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              Deep Dives & Expert Insights for the Modern Web
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-600 md:text-xl dark:text-zinc-400">
              Explore our curated library of high-value campaigns, tutorials, and comprehensive guides designed to level up your knowledge.
            </p>
            
            <div className="w-full max-w-md mx-auto">
              <form action="/search" className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  name="q"
                  placeholder="Search articles, guides, or topics..." 
                  className="pl-10 h-12 text-base rounded-full shadow-sm"
                />
                <Button type="submit" className="absolute right-1 rounded-full h-10 px-6">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* AdSlot - Header */}
      <div className="container mx-auto py-8">
        <AdSlot placement="HEADER" className="h-[90px] max-w-[728px]" />
      </div>

      <main className="container px-4 md:px-6 mx-auto max-w-7xl flex-1 flex flex-col gap-16 md:gap-24 py-8">
        
        {/* 2. Featured Campaign */}
        {featuredCampaign && (
          <section>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-6 w-1.5 bg-primary rounded-full" />
              <h2 className="text-3xl font-bold tracking-tight">Featured Story</h2>
            </div>
            <CampaignCard campaign={featuredCampaign} layout="horizontal" />
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 3. Latest Campaigns (Main Column) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1.5 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
              </div>
              <Button render={<Link href="/search?q=latest" />} nativeButton={false} variant="ghost" className="text-primary">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {latestCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
              {latestCampaigns.length === 0 && (
                <div className="col-span-2 py-12 text-center border rounded-xl bg-muted/20">
                  <p className="text-muted-foreground">More content coming soon.</p>
                </div>
              )}
            </div>

            {/* AdSlot - Inline */}
            <AdSlot placement="INLINE" className="h-[250px] my-12" />
            
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            
            {/* 4. Popular Categories */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-xl font-bold tracking-tight">Topics</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <Link 
                    key={cat.name} 
                    href={`/search?q=${cat.name.toLowerCase()}`}
                    className={`flex items-center justify-between px-4 py-2 rounded-full border text-sm font-medium transition-transform hover:scale-105 ${cat.color}`}
                  >
                    {cat.name}
                    <span className="ml-2 opacity-60 text-xs">{cat.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* AdSlot - Sidebar */}
            <AdSlot placement="SIDEBAR" className="h-[250px] w-full max-w-[300px] mx-auto" />

            {/* 5. Trending Articles */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-xl font-bold tracking-tight">Trending</h3>
              </div>
              <div className="space-y-6">
                {trendingCampaigns.map((campaign, i) => (
                  <Link key={campaign.id} href={`/c/${campaign.slug}`} className="group flex gap-4">
                    <span className="text-3xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {campaign.seoTitle || campaign.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">5 min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* 6. Why Choose Us */}
        <section className="py-16 px-8 rounded-3xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 my-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Read CampaignFlow?</h2>
            <p className="text-zinc-400 dark:text-zinc-600">We pride ourselves on delivering high-quality, actionable content without the fluff.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 dark:text-emerald-600" />
              <h3 className="text-xl font-bold">Expert Authors</h3>
              <p className="text-zinc-400 dark:text-zinc-600 text-sm">Every article is written by industry professionals with real-world experience.</p>
            </div>
            <div className="space-y-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 dark:text-emerald-600" />
              <h3 className="text-xl font-bold">No Paywalls</h3>
              <p className="text-zinc-400 dark:text-zinc-600 text-sm">We believe knowledge should be accessible. Our core guides are always free.</p>
            </div>
            <div className="space-y-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 dark:text-emerald-600" />
              <h3 className="text-xl font-bold">Actionable Steps</h3>
              <p className="text-zinc-400 dark:text-zinc-600 text-sm">Stop reading theory. Our content focuses on what you can actually build and do.</p>
            </div>
          </div>
        </section>

        {/* 7. Newsletter Subscription & 8. FAQ */}
        <div className="grid md:grid-cols-2 gap-16 items-start pb-12">
          
          <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-6">Get the latest articles, tutorials, and exclusive content delivered straight to your inbox every week.</p>
            <form className="space-y-4" action="#">
              <Input type="email" placeholder="hello@example.com" required className="h-12" />
              <Button type="submit" size="lg" className="w-full h-12">Subscribe Now</Button>
              <p className="text-xs text-muted-foreground text-center">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
            <Accordion className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is the content really free?</AccordionTrigger>
                <AccordionContent>
                  Yes! All of our articles and guides are completely free to read. We support the site through minimal, non-intrusive advertising.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How often is new content published?</AccordionTrigger>
                <AccordionContent>
                  We aim to publish 2-3 high-quality, deeply researched articles every single week.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I contribute an article?</AccordionTrigger>
                <AccordionContent>
                  We are currently not accepting guest posts, but we plan to open up a contributor program in the near future. Check back soon!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

      </main>
      
      {/* AdSlot - Footer */}
      <div className="container mx-auto pb-8">
        <AdSlot placement="FOOTER" className="h-[90px] max-w-[728px]" />
      </div>
    </div>
  );
}
