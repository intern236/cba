/**
 * Batch timetable and fees (Notion "Required Info": programme fees & batch timings —
 * NOT YET SUPPLIED). While this list is empty, /programs shows "ask us on WhatsApp"
 * instead of a table. Fill it with the academy's real batches and the table appears.
 * Publishing fees is the strongest trust signal an academy page can carry (NN/g: upfront pricing).
 *
 * Example row (do not ship without real data):
 *   { level: "Foundation", ages: "8–12", days: "Mon · Wed · Fri", time: "6:00–7:30 AM", fee: "₹— / month" }
 */
export type Batch = { level: string; ages: string; days: string; time: string; fee?: string };

export const batches: Batch[] = [];
