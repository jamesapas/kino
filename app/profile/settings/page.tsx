import { redirect } from "next/navigation";

import { ProfileSettingsForm } from "@/app/components/profile-settings-form";
import { getViewer } from "@/lib/auth/viewer";
import { createServerSupabase } from "@/lib/supabase/server";

export const metadata = { title: "Settings" };

/** Dates are formatted with a fixed locale so server and client agree. */
const MONTH_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export default async function ProfileSettingsPage() {
  const supabase = await createServerSupabase();
  const viewer = await getViewer(supabase);

  if (!viewer) {
    redirect("/");
  }

  const {
    email,
    profile,
    displayName: name,
    initials,
    avatarUrl: picture,
  } = viewer;
  const memberSince = MONTH_YEAR.format(
    new Date(profile?.created_at ?? viewer.createdAt),
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-bone">Settings</h1>

      <div className="mt-8">
        <ProfileSettingsForm
          userId={viewer.id}
          email={email}
          username={viewer.username}
          displayName={profile?.display_name ?? null}
          bio={profile?.bio ?? null}
          avatarUrl={picture}
          initials={initials}
          memberSince={memberSince}
        />
      </div>
    </div>
  );
}

