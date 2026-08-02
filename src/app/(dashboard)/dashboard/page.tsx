import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users } from "lucide-react";
import { getDashboardAnalytics } from "@/actions/analytics";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";

export default async function DashboardPage() {
  const analytics = await getDashboardAnalytics();

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">Published & drafts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews}</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Page Views Over Time</CardTitle>
            <CardDescription>Views across all campaigns over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AnalyticsChart data={analytics.chartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Campaigns</CardTitle>
            <CardDescription>Most viewed campaigns.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {analytics.topCampaigns.map((campaign, index) => (
                <div key={index} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none line-clamp-1">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">{campaign.views} views</p>
                  </div>
                </div>
              ))}
              
              {analytics.topCampaigns.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-8">
                  No data available yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
