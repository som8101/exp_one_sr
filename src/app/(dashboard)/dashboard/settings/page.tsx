import { getGlobalSettings } from "@/actions/settings";
import { SettingsForm } from "@/components/settings/settings-form";

export default async function SettingsPage() {
  const settings = await getGlobalSettings();

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your site's global configuration.</p>
        </div>
      </div>
      
      <SettingsForm initialData={settings} />
    </div>
  );
}
