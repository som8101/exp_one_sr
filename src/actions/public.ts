"use server";

import prisma from "@/lib/prisma";

export async function getPublishedCampaigns() {
  return prisma.campaign.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { pages: true },
      },
    },
  });
}

export async function getCampaignBySlug(slug: string) {
  return prisma.campaign.findUnique({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      categories: true,
      pages: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
}

export async function searchCampaigns(query: string) {
  return prisma.campaign.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { name: { contains: query } },
        { seoTitle: { contains: query } },
        { seoDescription: { contains: query } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { pages: true },
      },
    },
  });
}
