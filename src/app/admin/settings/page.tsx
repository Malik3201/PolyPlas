export const dynamic = "force-dynamic";

import { getSiteSettings } from "@/app/actions/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-charcoal">Site Settings</h1>
        <p className="text-stone-500 text-sm mt-0.5">
          Manage your website content, contact info, and branding
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
