import { ProfileSidebar } from "@/app/components/profile-sidebar";
import { SignInPrompt } from "@/app/components/sign-in-prompt";
import { getViewer } from "@/lib/auth/viewer";
import { getFollowCounts } from "@/lib/profiles/follows";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const viewer = await getViewer(supabase);

  if (!viewer) {
    return (
      <main className="page-container flex flex-1 items-center justify-center pt-28 pb-24">
        <SignInPrompt
          heading="Your account is waiting"
          body="Your watchlist, favorites, and profile settings are waiting for you. Sign in to access them."
          reason="To see your profile"
        />
      </main>
    );
  }

  const counts = await getFollowCounts(supabase, viewer.id);

  return (
    <main className="page-container flex-1 pt-28 pb-24 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-14">
      <ProfileSidebar
        displayName={viewer.displayName}
        username={viewer.username}
        avatarUrl={viewer.avatarUrl}
        initials={viewer.initials}
        bio={viewer.profile?.bio ?? null}
        followers={counts.followers}
        following={counts.following}
      />

      <div className="mt-10 lg:mt-0">{children}</div>
    </main>
  );
}
