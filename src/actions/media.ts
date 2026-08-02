"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getMedia() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteMedia(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get the media record
  const media = await prisma.media.findUnique({
    where: { id },
  });

  if (!media) throw new Error("Media not found");

  // In a real app we'd delete the file from the filesystem/S3 here
  // For local development, we'll just delete the DB record
  await prisma.media.delete({
    where: { id },
  });

  revalidatePath("/dashboard/media");
}
