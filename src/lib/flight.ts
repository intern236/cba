/**
 * Shuttlecock flight under gravity + quadratic drag.
 *
 *   dv/dt = −g ŷ − (g / Vt²) |v| v
 *
 * Numbers from the research brief (Cohen, Darbois-Texier, Quéré et al., "Physics of
 * badminton", New J. Phys. 2015; Collet): terminal speed Vt ≈ 6.5 m/s, decay length
 * L = Vt²/g ≈ 4.3 m, launch/terminal ratio ≈ 6–8 for a clear. The result is the
 * asymmetric "triangular" path players describe: a fast, nearly straight rising leg,
 * a short apex, then an almost vertical fall at terminal speed — not a parabola.
 */
export type Sample = { t: number; x: number; y: number; vx: number; vy: number };

export const VT = 6.5;
const G = 9.81;

export function simulateClear({
  speedRatio = 7,
  angleDeg = 58,
  maxT = 4,
}: { speedRatio?: number; angleDeg?: number; maxT?: number } = {}): Sample[] {
  const k = G / (VT * VT);
  const a = (angleDeg * Math.PI) / 180;
  let vx = speedRatio * VT * Math.cos(a);
  let vy = speedRatio * VT * Math.sin(a);
  let x = 0;
  let y = 0;
  const dt = 0.001;
  const out: Sample[] = [{ t: 0, x, y, vx, vy }];
  for (let i = 1; i * dt <= maxT; i++) {
    const v = Math.hypot(vx, vy);
    vx += -k * v * vx * dt;
    vy += (-G - k * v * vy) * dt;
    x += vx * dt;
    y += vy * dt;
    if (i % 4 === 0) out.push({ t: i * dt, x, y, vx, vy });
  }
  return out;
}

export type Point = { x: number; y: number };
export type ScreenSample = { t: number; x: number; y: number; angle: number; speed: number; len: number };

/**
 * Fit the simulated path between a launch point and a landing point on screen.
 * `apexY` sets how high the shuttle climbs; the horizontal scale is solved so the
 * shuttle lands exactly on `land`. Timing stays physical.
 */
export function fitToScreen(samples: Sample[], launch: Point, land: Point, apexY: number): ScreenSample[] {
  const rise = Math.max(...samples.map((s) => s.y));
  const sy = (launch.y - apexY) / rise; // px per metre, vertical
  const yLand = -(land.y - launch.y) / sy; // landing height in sim metres (relative to launch)
  let apexPassed = false;
  const kept: Sample[] = [];
  for (const s of samples) {
    kept.push(s);
    if (s.vy < 0) apexPassed = true;
    if (apexPassed && s.y <= yLand) break;
  }
  const last = kept[kept.length - 1];
  const sx = (land.x - launch.x) / last.x; // signed: negative = flies right-to-left
  let len = 0;
  let prev: Point | null = null;
  return kept.map((s) => {
    const x = launch.x + s.x * sx;
    const y = launch.y - s.y * sy;
    if (prev) len += Math.hypot(x - prev.x, y - prev.y);
    prev = { x, y };
    const vxs = s.vx * sx;
    const vys = -s.vy * sy;
    return { t: s.t, x, y, angle: (Math.atan2(vys, vxs) * 180) / Math.PI, speed: Math.hypot(s.vx, s.vy), len };
  });
}

export function pathFrom(points: ScreenSample[]): string {
  if (!points.length) return "";
  let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i += 2) d += ` L${points[i].x.toFixed(1)},${points[i].y.toFixed(1)}`;
  const l = points[points.length - 1];
  return d + ` L${l.x.toFixed(1)},${l.y.toFixed(1)}`;
}

export function restPose(land: { x: number; y: number }, scale: number) {
  const angle = 166;
  const pts = [
    [0, -5],
    [0, 5],
    [-35, -13.5],
    [-35, 13.5],
  ];
  const r = (angle * Math.PI) / 180;
  const maxY = Math.max(...pts.map(([x, y]) => (x * Math.sin(r) + y * Math.cos(r)) * scale));
  return { x: land.x + 6 * scale, y: land.y - maxY - 1, angle };
}
