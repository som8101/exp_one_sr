"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createCampaignPage, updateCampaignPage, deleteCampaignPage } from "@/actions/campaign-pages";

import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Trash } from "lucide-react";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  campaignId: z.string(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  ctaText: z.string().optional().nullable(),
  ctaUrl: z.string().optional().nullable(),
});

type PageFormProps = {
  campaignId: string;
  initialData?: {
    id: string;
    title: string;
    content: string;
    seoTitle: string | null;
    seoDescription: string | null;
    ctaText: string | null;
    ctaUrl: string | null;
  };
  onSuccess?: () => void;
};

export function PageForm({ campaignId, initialData, onSuccess }: PageFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignId,
      title: initialData?.title || "",
      content: initialData?.content || "",
      seoTitle: initialData?.seoTitle || "",
      seoDescription: initialData?.seoDescription || "",
      ctaText: initialData?.ctaText || "",
      ctaUrl: initialData?.ctaUrl || "",
    },
  });

  const contentValue = watch("content");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      if (initialData) {
        await updateCampaignPage(initialData.id, values);
      } else {
        await createCampaignPage(values);
      }
      
      setIsSuccess(true);
      router.refresh();
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error("Failed to save page", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!initialData || !confirm("Are you sure you want to delete this page?")) return;
    try {
      setIsDeleting(true);
      await deleteCampaignPage(initialData.id);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to delete page", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Page Title</Label>
        <Input id="title" placeholder="e.g. Introduction" {...register("title")} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <TiptapEditor 
          content={contentValue}
          onChange={(html) => setValue("content", html)}
        />
        {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
      </div>

      <Accordion className="w-full">
        <AccordionItem value="seo">
          <AccordionTrigger>SEO & Call To Action (Optional)</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input id="seoTitle" {...register("seoTitle")} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Input id="seoDescription" {...register("seoDescription")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaText">Custom CTA Button Text</Label>
                <Input id="ctaText" placeholder="Next Section" {...register("ctaText")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaUrl">Custom CTA Override URL</Label>
                <Input id="ctaUrl" placeholder="https://..." {...register("ctaUrl")} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex items-center justify-between pt-4 border-t">
        {initialData ? (
          <Button type="button" variant="destructive" size="icon" onClick={handleDelete} disabled={isLoading || isDeleting}>
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
          </Button>
        ) : <div />}
        
        <SubmitButton 
          isLoading={isLoading} 
          isSuccess={isSuccess} 
          disabled={isDeleting}
          defaultText={initialData ? "Save Changes" : "Create Page"} 
        />
      </div>
    </form>
  );
}
