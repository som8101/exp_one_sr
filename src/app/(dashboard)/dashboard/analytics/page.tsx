import { getDashboardAnalytics } from "@/actions/analytics";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AnalyticsPage() {
  const analytics = await getDashboardAnalytics();

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Detailed Analytics</h1>
          <p className="text-muted-foreground">Deep dive into your traffic and conversion metrics.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Views (Last 7 Days)</CardTitle>
          <CardDescription>Overall traffic aggregated across all campaigns.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2 pt-6 pb-6">
          <AnalyticsChart data={analytics.chartData} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
            <CardDescription>Where your audience is discovering your content.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32 border border-dashed rounded-md bg-zinc-50/50 dark:bg-zinc-900/50">
              <p className="text-sm text-muted-foreground">Referrer tracking requires Pro plan.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Geographic and device breakdowns.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32 border border-dashed rounded-md bg-zinc-50/50 dark:bg-zinc-900/50">
              <p className="text-sm text-muted-foreground">Demographics tracking requires Pro plan.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
