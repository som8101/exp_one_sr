import { getCampaign } from "@/actions/campaigns";
import { CampaignForm } from "@/components/campaigns/campaign-form";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PageForm } from "@/components/campaigns/page-form";

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const campaign = await getCampaign(resolvedParams.id);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Campaign</h1>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="pages">Content Pages</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <CampaignForm
            initialData={{
              id: campaign.id,
              name: campaign.name,
              slug: campaign.slug,
              seoDescription: campaign.seoDescription || "",
              status: campaign.status,
            }}
          />
        </TabsContent>
        <TabsContent value="pages" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Campaign Pages</CardTitle>
                <CardDescription>Manage the articles inside this campaign.</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Page
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <PageForm campaignId={campaign.id} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {campaign.pages.length === 0 ? (
                <div className="flex items-center justify-center p-8 border border-dashed rounded-lg text-muted-foreground text-sm">
                  No pages added yet. Click "Add Page" to create one.
                </div>
              ) : (
                <div className="space-y-4">
                  {campaign.pages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{page.title}</h4>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <PageForm campaignId={campaign.id} initialData={page} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
