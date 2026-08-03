"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createCampaign, updateCampaign } from "@/actions/campaigns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaPicker } from "@/components/media/media-picker";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  slug: z.string().min(3, "Slug must be at least 3 characters."),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  featuredImage: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

type CampaignFormProps = {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    seoTitle: string | null;
    seoDescription: string | null;
    featuredImage: string | null;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  };
};

export function CampaignForm({ initialData }: CampaignFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      seoTitle: initialData?.seoTitle || "",
      seoDescription: initialData?.seoDescription || "",
      featuredImage: initialData?.featuredImage || "",
      status: initialData?.status || "DRAFT",
    },
  });

  const featuredImage = watch("featuredImage");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("name", e.target.value);
    if (!initialData) {
      setValue(
        "slug",
        e.target.value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      if (initialData) {
        await updateCampaign(initialData.id, values);
        router.refresh();
      } else {
        const newCampaign = await createCampaign(values);
        router.push(`/dashboard/campaigns/${newCampaign.id}`);
      }
    } catch (error) {
      console.error("Failed to save campaign", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? "Edit Campaign" : "New Campaign"}</CardTitle>
          <CardDescription>
            {initialData
              ? "Update your campaign details."
              : "Create a new content campaign to start adding pages."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              placeholder="e.g. Summer Fitness Guide"
              {...register("name")}
              onChange={(e) => {
                register("name").onChange(e);
                handleNameChange(e);
              }}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            <p className="text-sm text-muted-foreground">The internal name of your campaign.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input id="slug" placeholder="summer-fitness-guide" {...register("slug")} />
            {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
            <p className="text-sm text-muted-foreground">
              This will be the URL for your campaign: yoursite.com/c/<strong>slug</strong>
            </p>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              defaultValue={initialData?.status || "DRAFT"} 
              onValueChange={(val) => setValue("status", val as "DRAFT" | "PUBLISHED" | "ARCHIVED")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Only published campaigns will appear on the public website.
            </p>
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Save Changes" : "Create Campaign"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO & Social Sharing</CardTitle>
          <CardDescription>
            Optimize your campaign for search engines and social media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title (Optional)</Label>
            <Input id="seoTitle" placeholder="Optimized Title for Search" {...register("seoTitle")} />
            <p className="text-sm text-muted-foreground">Overrides the campaign name in search results.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">Meta Description</Label>
            <Textarea 
              id="seoDescription" 
              placeholder="Brief summary of the campaign..." 
              {...register("seoDescription")} 
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Featured Image (Open Graph)</Label>
            <div className="mt-2 flex items-center gap-4">
              {featuredImage && (
                <div className="relative h-24 w-40 rounded-md overflow-hidden border">
                  <Image src={featuredImage} alt="Featured" fill className="object-cover" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 border rounded-md p-1 bg-muted/50">
                   <MediaPicker onSelect={(url) => setValue("featuredImage", url)} />
                   <span className="text-sm text-muted-foreground px-2">Choose Image</span>
                </div>
                {featuredImage && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setValue("featuredImage", "")} className="text-destructive w-fit">
                    Remove Image
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Used as the preview image when sharing links on social media.</p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
