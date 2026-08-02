import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { campaignId, pageUrl, visitorId, country, device, browser, referrer } = body;

    if (!pageUrl || !visitorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const analyticsEvent = await prisma.analytics.create({
      data: {
        campaignId: campaignId || null,
        pageUrl,
        visitorId,
        country,
        device,
        browser,
        referrer,
      },
    });

    return NextResponse.json({ success: true, data: analyticsEvent }, { status: 201 });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
