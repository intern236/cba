/**
 * Coach profiles (Notion: "Staff Profiles", required, not yet supplied).
 * Fill in with the client's real coaches and photos placed in /public/images/coaches/.
 * While empty, /about shows an invitation to meet the team at a free trial instead.
 */
export type Coach = {
  name: string;
  role: string; // e.g. "Head coach"
  credentials: string; // e.g. "NIS-certified · 12 years coaching"
  photo?: string; // e.g. "/images/coaches/first-last.webp" (4:5)
  bio?: string;
};

export const coaches: Coach[] = [];

/** Owner/founder note (Notion: "owner details (for about)") — pending from client. */
export const founder: { name: string; title: string; note: string } | null = null;
