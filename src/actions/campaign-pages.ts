"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const pageSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(10),
  campaignId: z.string(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  ctaText: z.string().optional().nullable(),
  ctaUrl: z.string().optional().nullable(),
});

export async function createCampaignPage(data: z.infer<typeof pageSchema>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const validated = pageSchema.parse(data);

  // Get the current max order for this campaign
  const maxOrderPage = await prisma.campaignPage.findFirst({
    where: { campaignId: validated.campaignId },
    orderBy: { order: "desc" },
  });

  const nextOrder = maxOrderPage ? maxOrderPage.order + 1 : 0;

  const page = await prisma.campaignPage.create({
    data: {
      ...validated,
      order: nextOrder,
    },
  });

  revalidatePath(`/dashboard/campaigns/${validated.campaignId}`);
  return page;
}

export async function updateCampaignPage(id: string, data: Partial<z.infer<typeof pageSchema>>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const page = await prisma.campaignPage.update({
    where: { id },
    data,
  });

  revalidatePath(`/dashboard/campaigns/${page.campaignId}`);
  return page;
}

export async function deleteCampaignPage(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const page = await prisma.campaignPage.delete({
    where: { id },
  });

  revalidatePath(`/dashboard/campaigns/${page.campaignId}`);
}
