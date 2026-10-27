/**
 * Court-floor perspective for the hero photo (public/images/play-rally-*.webp, 1440×1080).
 *
 * The photo looks down the length of the court, so the hero shot has to fly *into* the picture,
 * not across the screen. We map the court floor onto the photo with a homography fitted to four
 * line crossings that are visible in the photo (court metres → photo pixels):
 *
 *   centre line × near short-service line        (0, 1.98)   → (755, 768)
 *   right sideline × near short-service line     (3.05, 1.98) → (1172, 780)
 *   right sideline × near doubles long-service   (3.05, 5.94) → (1300, 1002)
 *   centre line × near doubles long-service      (0, 5.94)   → (545, 943)
 *
 * X = metres right of the centre line, Z = metres from the net toward the camera (far court < 0).
 * Checked by drawing every court line back onto the photo: they sit on the real lines in both
 * halves. Heights: a point h metres up is drawn h × (local px per metre) × KV above its floor
 * point. KV was checked on the net post (1.55 m); people come out at plausible heights.
 *
 * A NEW HERO PHOTO NEEDS NEW NUMBERS: re-measure the four crossings and the racket point.
 */
export const PHOTO_W = 1440;
export const PHOTO_H = 1080;

const H = [
    [81.77476, -92.44526, 804.1293],
    [-17.19293, -48.1197, 727.05892],
    [-0.02619, -0.08958, 1],
];
const KV = 0.9;

/** The girl's racket in the photo, in photo pixels. */
export const RACKET_PX: [number, number] = [991, 648];

export function floorToPhoto(X: number, Z: number): [number, number] {
    const w = H[2][0] * X + H[2][1] * Z + 1;
    return [(H[0][0] * X + H[0][1] * Z + H[0][2]) / w, (H[1][0] * X + H[1][1] * Z + H[1][2]) / w];
}

/** Photo pixels per metre across the court at a floor point. */
function pxPerMetre(X: number, Z: number) {
    const a = floorToPhoto(X, Z);
    const b = floorToPhoto(X + 0.1, Z);
    return Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.1;
}

export type FlightSample = {
    /** seconds since launch */
    t: number;
    /** shuttle, photo px */
    x: number;
    y: number;
    /** its floor point (shadow), photo px */
    gx: number;
    gy: number;
    /** photo px per metre at this depth: drives shuttle and shadow size */
    k: number;
    /** height above the floor, metres */
    h: number;
};

/**
 * A cross-court clear from the girl's racket to the far left back corner, ~11 m.
 * Drag shape without a full simulation: floor progress decays exponentially (fast off the
 * racket, slowing), height is a parabola in time. Together they give the asymmetric clear:
 * a straight climb, a short peak about 5 m up beyond the net, then a near-vertical fall.
 */
export function heroClear() {
    const Z0 = 4.9; // floor under the racket, just in front of her feet
    let lo = -3;
    let hi = 5;
    for (let i = 0; i < 40; i++) {
        const m = (lo + hi) / 2;
        if (floorToPhoto(m, Z0)[0] < RACKET_PX[0]) lo = m;
        else hi = m;
    }
    const X0 = (lo + hi) / 2;
    const g0 = floorToPhoto(X0, Z0);
    const H0 = (g0[1] - RACKET_PX[1]) / (pxPerMetre(X0, Z0) * KV);
    const X1 = -2.3;
    const Z1 = -5.6;
    const T = 2.0;
    const KD = 2.4;
    const APEX = 5.0;

    const N = 160;
    const samples: FlightSample[] = [];
    for (let i = 0; i <= N; i++) {
        const u = i / N;
        const p = (1 - Math.exp(-KD * u)) / (1 - Math.exp(-KD));
        const X = X0 + (X1 - X0) * p;
        const Z = Z0 + (Z1 - Z0) * p;
        const h = H0 * (1 - u) + 4 * APEX * u * (1 - u);
        const [gx, gy] = floorToPhoto(X, Z);
        const k = pxPerMetre(X, Z);
        samples.push({ t: u * T, x: gx, y: gy - h * k * KV, gx, gy, k, h });
    }

    // Shape of a small circle on the floor at the landing point (for the impact ring).
    const ring = Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return floorToPhoto(X1 + 0.5 * Math.cos(a), Z1 + 0.5 * Math.sin(a));
    });
    const xs = ring.map((p) => p[0]);
    const ys = ring.map((p) => p[1]);
    const ringRatio = (Math.max(...ys) - Math.min(...ys)) / (Math.max(...xs) - Math.min(...xs));

    return { T, samples, ringRatio };
}
