/**
 * Real, client-approved quotes only — with the player's (or parent's) permission.
 * Leave empty until supplied; the site then shows the Google rating summary instead.
 *
 * Example shape:
 *   { quote: "…", name: "First name L.", role: "Parent of U-13 player" }
 */
export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [];
