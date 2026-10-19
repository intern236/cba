import { Barbell, FirstAidKit, Drop, Lockers, Coffee, Storefront, Bed, Wind } from "@phosphor-icons/react/ssr";

const map = {
  courts: Wind,
  gym: Barbell,
  physio: FirstAidKit,
  steam: Drop,
  lockers: Lockers,
  cafe: Coffee,
  shop: Storefront,
  hostel: Bed,
} as const;

export function FacilityIcon({ k, className = "" }: { k: string; className?: string }) {
  const I = map[k as keyof typeof map] ?? Wind;
  return (
    <span aria-hidden="true" className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-court-950 text-lime ${className}`}>
      <I size={18} weight="bold" />
    </span>
  );
}
