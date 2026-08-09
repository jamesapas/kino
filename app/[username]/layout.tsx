import { notFound } from "next/navigation";

import { ProfileSidebar } from "@/app/components/profile-sidebar";
import { SignInPrompt } from "@/app/components/sign-in-prompt";
import { getViewer } from "@/lib/auth/viewer";
import { getRatingStats } from "@/lib/movies/catalog";
import { avatarUrl, displayNameFor, initialsFor } from "@/lib/profiles/avatar";
import { getFollowCounts, isFollowing } from "@/lib/profiles/follows";
import { getProfileByUsername } from "@/lib/profiles/queries";
import { createServerSupabase } from "@/lib/supabase/server";

const JOINED_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
};

export default async function UsernameLayout({ children, params }: LayoutProps) {
  const { username } = await params;
  const supabase = await createServerSupabase();
  const viewer = await getViewer(supabase);
  const isOwner = viewer?.username?.toLowerCase() === username.toLowerCase();

  const profile = isOwner ? viewer!.profile : await getProfileByUsername(supabase, username);
  if (!profile) {
    if (isOwner) {
      return (
        <main className="page-container flex flex-1 items-center justify-center pt-28 pb-24">
          <SignInPrompt
            heading="Your profile is waiting"
            body="How you score things, what you gravitate towards, and every film you've rated. Sign in to see yours."
            reason="To see your profile"
          />
        </main>
      );
    }
    notFound();
  }

  const [{ stats }, counts, viewerFollows] = await Promise.all([
    getRatingStats(supabase, profile.id),
    getFollowCounts(supabase, profile.id),
    viewer && !isOwner ? isFollowing(supabase, viewer.id, profile.id) : Promise.resolve(false),
  ]);

  const name = isOwner ? viewer!.displayName : displayNameFor(profile.display_name, profile.username);
  const initials = isOwner ? viewer!.initials : initialsFor(profile.display_name, profile.username);
  const picture = isOwner ? viewer!.avatarUrl : avatarUrl(profile.avatar_path);
  const joined = JOINED_FORMAT.format(new Date(profile.created_at));

  return (
    <main className="page-container flex-1 pt-28 pb-24 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-14">
      <ProfileSidebar
        displayName={name}
        username={profile.username}
        avatarUrl={picture}
        initials={initials}
        bio={profile.bio}
        followers={counts.followers}
        following={counts.following}
        isOwner={isOwner}
        profileId={profile.id}
        viewerFollows={viewerFollows}
        joinedDate={joined}
        statsCount={stats.count}
        statsAverage={stats.averageStars ? `${stats.averageStars.toFixed(1)}★` : "—"}
      />

      <div className="mt-10 lg:mt-0">{children}</div>
    </main>
  );
}
