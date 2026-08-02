"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteMedia } from "@/actions/media";
import { useTransition } from "react";

type Media = {
  id: string;
  url: string;
  filename: string;
  size: number;
  createdAt: Date;
};

export function MediaList({ 
  initialMedia, 
  onSelect 
}: { 
  initialMedia: Media[],
  onSelect?: (url: string) => void
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      startTransition(async () => {
        await deleteMedia(id);
      });
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (initialMedia.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/20">
        No media files uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {initialMedia.map((media) => (
        <div 
          key={media.id} 
          className={`group relative border rounded-lg overflow-hidden bg-background transition-all ${
            onSelect ? "cursor-pointer hover:border-primary hover:ring-1 hover:ring-primary" : ""
          }`}
          onClick={() => onSelect && onSelect(media.url)}
        >
          <div className="aspect-square relative flex items-center justify-center bg-muted/30">
            <Image
              src={media.url}
              alt={media.filename}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          </div>
          <div className="p-3">
            <p className="text-sm font-medium truncate" title={media.filename}>
              {media.filename}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatBytes(media.size)}
            </p>
          </div>
          {!onSelect && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 shadow-sm"
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(media.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
