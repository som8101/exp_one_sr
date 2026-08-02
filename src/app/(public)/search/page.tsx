import { searchCampaigns } from "@/actions/public";
import { CampaignCard } from "@/components/public/campaign-card";
import { Search, FolderSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedSearchParams = await searchParams;
  return {
    title: `Search results for "${resolvedSearchParams.q || ""}" | CampaignFlow`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";
  
  // If no query, we just return an empty array to prompt them to search
  const results = query ? await searchCampaigns(query) : [];

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16 flex-1">
      
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Search Content
        </h1>
        
        <form action="/search" className="relative flex items-center mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            name="q"
            defaultValue={query}
            placeholder="Search articles, guides, or topics..." 
            className="pl-10 h-12 text-base rounded-full shadow-sm"
          />
          <Button type="submit" className="absolute right-1 rounded-full h-10 px-6">
            Search
          </Button>
        </form>
        
        {query && (
          <p className="text-muted-foreground mt-6 text-sm">
            Found {results.length} result{results.length !== 1 ? 's' : ''} for <span className="font-semibold text-foreground">"{query}"</span>
          </p>
        )}
      </div>

      {!query && (
        <div className="py-24 flex flex-col items-center justify-center text-center opacity-50">
          <FolderSearch className="h-16 w-16 mb-4" />
          <p className="text-xl font-medium">Enter a search term above</p>
          <p className="text-sm">Find articles, campaigns, and guides instantly.</p>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">No results found</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            We couldn't find anything matching "{query}". Try adjusting your search or browse our categories.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
      
    </div>
  );
}
