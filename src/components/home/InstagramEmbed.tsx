// src/components/home/instagram-feed.tsx
// Instagram section styled with the project's Tailwind tokens (global.css).
// Uses only the Instagram username, no token. Server Component, no "use client" needed.

const DEFAULT_USERNAME = "celestialsbadmintonacademy";

type InstagramFeedProps = {
  /** Instagram username without the @ */
  username?: string;
  /** Height of the Instagram frame in pixels. Increase it if posts are cut off. */
  height?: number;
};

export function InstagramFeed({
  username = DEFAULT_USERNAME,
  height = 440,
}: InstagramFeedProps) {
  const profileUrl = `https://www.instagram.com/${username}/`;

  return (
    <section aria-labelledby="instagram-heading" className="bg-chalk-2 text-ink">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[540px_1fr] lg:items-center lg:gap-12 lg:py-14">
       <div className="reveal mx-auto w-full max-w-[540px] overflow-hidden rounded-2xl bg-white p-2">
  <iframe
    src={`${profileUrl}embed`}
    title={`Instagram posts from ${username}`}
    loading="lazy"
    scrolling="no"
    className="block w-full rounded-xl border-0"
    style={{ height }}
  />
</div>

        <div className="reveal">
          <h2
            id="instagram-heading"
            className="display text-4xl text-ink sm:text-5xl lg:text-6xl"
          >
            Fresh from the courts
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-ink sm:text-lg">
            Training days, match results and academy news, straight from{" "}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-semibold text-ink"
            >
              @{username}
            </a>
            .
          </p>

          {/* Wrapper pushes the whole button (link + black background) to the right, on all screen sizes */}
          <div className="mt-5 flex justify-end">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink"
            >
              Follow us on Instagram
              <span className="btn-icon" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export { InstagramFeed as InstagramEmbed };
export default InstagramFeed;