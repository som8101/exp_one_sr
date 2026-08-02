"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// The CMS only needs one settings record globally.
export async function getGlobalSettings() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let settings = await prisma.settings.findFirst();

  // If no settings exist yet, create a default record
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        siteName: "CampaignFlow",
        theme: "system",
      },
    });
  }

  return settings;
}

export async function updateGlobalSettings(data: {
  siteName: string;
  siteDescription?: string;
  logoUrl?: string;
  faviconUrl?: string;
  theme: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.settings.findFirst();

  if (existing) {
    await prisma.settings.update({
      where: { id: existing.id },
      data,
    });
  } else {
    await prisma.settings.create({ data });
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/", "layout");
}
