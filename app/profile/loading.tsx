/**
 * Shown while profile content (watchlist, favorites, settings) is loading.
 *
 * Rendered inside ProfileLayout, so the ProfileSidebar remains intact
 * on the left rail while only the right-side content area skeletonizes.
 */
export default function ProfileContentLoading() {
  return (
    <div>
      <div className="skeleton h-7 w-24 rounded" />
      <div className="skeleton mt-1 h-3 w-40 rounded" />

      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))]">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="skeleton aspect-[2/3] w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
