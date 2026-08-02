import { CampaignForm } from "@/components/campaigns/campaign-form";

export default function NewCampaignPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
      </div>
      <CampaignForm />
    </div>
  );
}
