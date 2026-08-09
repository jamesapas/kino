/**
 * Shown while the profile settings page is loading inside ProfileLayout.
 *
 * Preserves the ProfileSidebar on the left rail while rendering realistic
 * settings form skeletons on the right.
 */
export default function SettingsLoading() {
  return (
    <div>
      <div className="skeleton h-7 w-28 rounded" />

      <div className="mt-8 divide-y divide-ink-line">
        {/* Picture row */}
        <div className="py-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div className="skeleton h-4 w-24 shrink-0 rounded" />
          <div className="flex items-center gap-4">
            <div className="skeleton size-14 shrink-0 rounded-full" />
            <div className="skeleton h-9 w-32 rounded-md" />
          </div>
        </div>

        {/* Handle row */}
        <div className="py-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div className="skeleton h-4 w-24 shrink-0 rounded" />
          <div className="flex-1 space-y-2 max-w-md">
            <div className="skeleton h-10 w-full rounded-md" />
            <div className="skeleton h-3 w-48 rounded" />
          </div>
        </div>

        {/* Display name row */}
        <div className="py-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div className="skeleton h-4 w-24 shrink-0 rounded" />
          <div className="flex-1 space-y-2 max-w-md">
            <div className="skeleton h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Bio row */}
        <div className="py-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div className="skeleton h-4 w-24 shrink-0 rounded" />
          <div className="flex-1 space-y-2 max-w-md">
            <div className="skeleton h-24 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
