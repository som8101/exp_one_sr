"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getDashboardAnalytics() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get total campaigns
  const totalCampaigns = await prisma.campaign.count();
  
  // Get total page views
  const totalViews = await prisma.analytics.count();

  // Get views over time (last 7 days simplified)
  // Note: For a production app with heavy traffic, you'd use raw SQL for time-series grouping
  // This is a simplified application-level grouping suitable for moderate traffic
  const recentAnalytics = await prisma.analytics.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    },
    select: {
      createdAt: true
    }
  });

  const viewsByDay: Record<string, number> = {};
  
  // Initialize last 7 days with 0
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    viewsByDay[dateStr] = 0;
  }

  recentAnalytics.forEach((record: { createdAt: Date }) => {
    const dateStr = record.createdAt.toISOString().split('T')[0];
    if (viewsByDay[dateStr] !== undefined) {
      viewsByDay[dateStr]++;
    }
  });

  const chartData = Object.entries(viewsByDay).map(([date, views]) => ({
    date,
    views
  }));

  // Get top campaigns
  const topCampaigns = await prisma.analytics.groupBy({
    by: ['campaignId'],
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 5
  });

  // Resolve campaign names
  const resolvedTopCampaigns = await Promise.all(
    topCampaigns.filter((c: any) => c.campaignId).map(async (c: any) => {
      const campaign = await prisma.campaign.findUnique({
        where: { id: c.campaignId as string },
        select: { name: true }
      });
      return {
        name: campaign?.name || 'Unknown',
        views: c._count.id
      };
    })
  );

  return {
    totalCampaigns,
    totalViews,
    chartData,
    topCampaigns: resolvedTopCampaigns
  };
}
