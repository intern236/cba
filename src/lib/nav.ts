/**
 * Academy-first navigation (revision 2, 16 Oct 2026): the site's job is to start
 * new players and move existing ones forward. Court booking stays reachable from
 * the homepage, the mobile menu, Facilities and the footer, but is no longer a nav item.
 */
export const navLinks = [
  { href: "/pathway/", label: "Pathway" },
  { href: "/programs/", label: "Programs" },
  { href: "/first-session/", label: "First session" },
  { href: "/facilities/", label: "Facilities" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Secondary links (footer, mobile menu). */
export const moreLinks = [{ href: "/gallery/", label: "Gallery" }] as const;
