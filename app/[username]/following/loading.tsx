/**
 * Shown while a user's following list is loading inside UsernameLayout.
 *
 * Preserves the ProfileSidebar on the left rail while rendering realistic
 * following list row skeletons on the right.
 */
export default function FollowingLoading() {
  return (
    <div>
      <div className="skeleton h-7 w-32 rounded border-b border-ink-line pb-4" />

      <div className="mt-2 flex flex-col divide-y divide-ink-line">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="skeleton size-10 shrink-0 rounded-full" />
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="skeleton h-4 w-32 sm:w-40 rounded" />
                <div className="skeleton h-3 w-20 sm:w-24 rounded" />
              </div>
            </div>
            <div className="skeleton h-8 w-20 shrink-0 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
