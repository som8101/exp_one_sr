"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const campaignSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  featuredImage: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export async function getCampaigns() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      pages: true,
      _count: {
        select: { pages: true },
      },
    },
  });
}

export async function getCampaign(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.campaign.findUnique({
    where: { id },
    include: {
      pages: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function createCampaign(data: z.infer<typeof campaignSchema>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const validated = campaignSchema.parse(data);

  const campaign = await prisma.campaign.create({
    data: {
      ...validated,
    },
  });

  revalidatePath("/dashboard/campaigns");
  return campaign;
}

export async function updateCampaign(id: string, data: Partial<z.infer<typeof campaignSchema>>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const campaign = await prisma.campaign.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/campaigns");
  revalidatePath(`/dashboard/campaigns/${id}`);
  return campaign;
}

export async function deleteCampaign(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.campaign.delete({
    where: { id },
  });

  revalidatePath("/dashboard/campaigns");
}
