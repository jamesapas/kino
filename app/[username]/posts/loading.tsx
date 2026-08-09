/**
 * Shown while a user's posts page is loading inside UsernameLayout.
 *
 * Rendered inside UsernameLayout, so the ProfileSidebar remains intact
 * on the left rail while realistic feed post skeletons display on the right.
 */
export default function UserPostsLoading() {
  return (
    <div>
      <div className="skeleton h-7 w-36 rounded border-b border-ink-line pb-4" />

      <div className="mt-6 space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-b border-ink-line pb-6 pt-2">
            <div className="flex gap-3 sm:gap-4">
              <div className="skeleton size-9 sm:size-[44px] shrink-0 rounded-full" />

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="skeleton h-3.5 sm:h-4 w-24 sm:w-28 rounded-md" />
                      <div className="skeleton h-3 w-16 sm:w-20 rounded-md" />
                    </div>
                    <div className="skeleton h-3 w-14 sm:w-16 rounded-md" />
                  </div>
                  <div className="skeleton h-7 w-7 sm:w-8 shrink-0 rounded-full" />
                </div>

                <div className="space-y-2 pt-0.5">
                  <div className="skeleton h-3 sm:h-3.5 w-[92%] rounded-md" />
                  <div className="skeleton h-3 sm:h-3.5 w-[65%] rounded-md" />
                </div>

                {i % 2 === 0 && (
                  <div className="pt-1 flex gap-3 flex-nowrap">
                    <div className="space-y-1.5 w-20 sm:w-28 shrink-0">
                      <div className="skeleton aspect-[2/3] w-full rounded-lg" />
                      <div className="skeleton h-3 w-14 sm:w-16 rounded-md" />
                    </div>
                    <div className="space-y-1.5 w-20 sm:w-28 shrink-0">
                      <div className="skeleton aspect-[2/3] w-full rounded-lg" />
                      <div className="skeleton h-3 w-16 sm:w-20 rounded-md" />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 sm:gap-4 pt-1">
                  <div className="skeleton h-6 w-12 sm:w-14 rounded-full" />
                  <div className="skeleton h-6 w-20 sm:w-24 rounded-full" />
                  <div className="skeleton h-6 w-14 sm:w-16 rounded-full" />
                </div>

                <div className="pt-2 border-l-2 border-ink-line pl-3.5 flex items-center gap-2.5">
                  <div className="skeleton size-6 sm:size-7 shrink-0 rounded-full" />
                  <div className="skeleton h-8 sm:h-9 min-w-0 flex-1 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
