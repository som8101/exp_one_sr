"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const articleSchema = z.object({
  campaignId: z.string(),
  title: z.string().min(3),
  content: z.string().default(""),
  order: z.number().default(0),
});

export async function createArticle(data: z.infer<typeof articleSchema>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const validated = articleSchema.parse(data);

  // Get the highest order number in this campaign
  const lastArticle = await prisma.campaignPage.findFirst({
    where: { campaignId: validated.campaignId },
    orderBy: { order: "desc" },
  });
  
  const order = lastArticle ? lastArticle.order + 1 : 0;

  const article = await prisma.campaignPage.create({
    data: {
      ...validated,
      order,
    },
  });

  revalidatePath(`/dashboard/campaigns/${validated.campaignId}`);
  return article;
}

export async function updateArticle(id: string, data: Partial<z.infer<typeof articleSchema>>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const article = await prisma.campaignPage.update({
    where: { id },
    data,
  });

  revalidatePath(`/dashboard/campaigns/${article.campaignId}`);
  return article;
}

export async function deleteArticle(id: string, campaignId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.campaignPage.delete({
    where: { id },
  });

  revalidatePath(`/dashboard/campaigns/${campaignId}`);
}
