"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { updateGlobalSettings } from "@/actions/settings";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  siteName: z.string().min(2, "Site Name must be at least 2 characters."),
  siteDescription: z.string().optional(),
  logoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  theme: z.string(),
});

type SettingsFormProps = {
  initialData: {
    siteName: string;
    siteDescription: string | null;
    logoUrl: string | null;
    theme: string;
  };
};

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: initialData.siteName,
      siteDescription: initialData.siteDescription || "",
      logoUrl: initialData.logoUrl || "",
      theme: initialData.theme,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await updateGlobalSettings(values);
      setTheme(values.theme);
      router.refresh();
    } catch (error) {
      console.error("Failed to save settings", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
          <CardDescription>
            Manage your site's global configuration and branding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" {...register("siteName")} />
            {errors.siteName && <p className="text-sm text-destructive">{errors.siteName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea id="siteDescription" {...register("siteDescription")} />
            {errors.siteDescription && <p className="text-sm text-destructive">{errors.siteDescription.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL (Optional)</Label>
            <Input id="logoUrl" placeholder="https://example.com/logo.png" {...register("logoUrl")} />
            {errors.logoUrl && <p className="text-sm text-destructive">{errors.logoUrl.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Default Theme</Label>
            <Select 
              defaultValue={initialData.theme} 
              onValueChange={(val) => setValue("theme", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
