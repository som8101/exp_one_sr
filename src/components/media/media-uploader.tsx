"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MediaUploader() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        {isUploading ? (
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        ) : (
          <UploadCloud className="h-8 w-8 text-primary" />
        )}
      </div>
      <h3 className="font-semibold mb-1">
        {isUploading ? "Uploading..." : "Click or drag file to this area to upload"}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
        Supports JPG, PNG, WEBP, and GIF images up to 5MB.
      </p>
      <div>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={onFileChange}
          disabled={isUploading}
        />
        <Button render={<label htmlFor="file-upload" className="cursor-pointer" />} variant="secondary" disabled={isUploading}>
          Select a file
        </Button>
      </div>
    </div>
  );
}
