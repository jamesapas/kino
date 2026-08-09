/**
 * Shown while a user's profile content is loading inside UsernameLayout.
 *
 * Rendered inside UsernameLayout, so the ProfileSidebar remains intact
 * on the left rail while only the right column content skeletonizes.
 */
export default function Loading() {
  return (
    <div className="flex flex-col gap-12">
      {/* Rating spread + Kino Take row */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Rating spread */}
        <section>
          <div className="skeleton h-6 w-36 rounded" />
          <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-center">
            <div className="flex shrink-0 flex-col items-center gap-2 sm:self-center">
              <div className="skeleton h-10 w-16 rounded" />
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-3 w-20 rounded" />
            </div>
            <div className="flex w-full flex-col gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="skeleton h-3 w-5 rounded" />
                  <div className="skeleton h-2 flex-1 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kino Take */}
        <section>
          <div className="skeleton h-6 w-28 rounded" />
          <div className="mt-4 space-y-2">
            <div className="skeleton h-3 w-full rounded" />
            <div className="skeleton h-3 w-11/12 rounded" />
            <div className="skeleton h-3 w-4/5 rounded" />
          </div>
        </section>
      </div>

      {/* Posts section */}
      <section>
        <div className="skeleton h-6 w-24 rounded" />
        <div className="mt-4 space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="skeleton h-4 w-48 rounded" />
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-3/4 rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* Rated films grid */}
      <section>
        <div className="skeleton h-6 w-40 rounded" />
        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="skeleton aspect-[2/3] w-full rounded-md"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
