"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { MediaUploader } from "@/components/media/media-uploader";
import { MediaList } from "@/components/media/media-list";
import { getMedia } from "@/actions/media";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Media = {
  id: string;
  url: string;
  filename: string;
  size: number;
  createdAt: Date;
};

export function MediaPicker({ onSelect }: { onSelect: (url: string) => void }) {
  const [open, setOpen] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("library");

  const loadMedia = async () => {
    setLoading(true);
    try {
      const files = await getMedia();
      setMediaFiles(files);
    } catch (error) {
      console.error("Failed to load media:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadMedia();
    }
  }, [open]);

  const handleSelect = (url: string) => {
    onSelect(url);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Insert Image">
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">Insert Image</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
          <DialogDescription>
            Select an image to insert into your content or upload a new one.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={tab} onValueChange={setTab} className="flex-1 overflow-hidden flex flex-col mt-2">
          <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto pb-0">
            <TabsTrigger value="library" className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent pb-3">
              Your Images
            </TabsTrigger>
            <TabsTrigger value="upload" className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent pb-3">
              Upload New
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="library" className="flex-1 overflow-y-auto pt-4 outline-none">
            {loading ? (
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                Loading media...
              </div>
            ) : (
              <MediaList initialMedia={mediaFiles} onSelect={handleSelect} />
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="pt-4 outline-none">
            <MediaUploader />
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={() => {
                setTab("library");
                loadMedia();
              }}>
                Back to Library
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
