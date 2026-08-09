import { redirect } from "next/navigation";

import { getViewer } from "@/lib/auth/viewer";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createServerSupabase();
  const viewer = await getViewer(supabase);

  if (!viewer) {
    redirect("/");
  }

  if (viewer.username) {
    redirect(`/${viewer.username}`);
  }

  redirect("/profile/watchlist");
}
