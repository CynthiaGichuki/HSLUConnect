export type MembershipTier = "discover" | "connect" | "belong";

export const MEMBERSHIP_TIERS: Array<{
  key: MembershipTier;
  name: string;
  priceLabel: string;
  shortDescription: string;
  benefits: string[];
}> = [
  {
    key: "discover",
    name: "Discover",
    priceLabel: "Free",
    shortDescription: "One free event per month.",
    benefits: [
      "Access to one free event each month",
      "Great for trying out the community",
      "Best for occasional event-goers",
    ],
  },
  {
    key: "connect",
    name: "Connect",
    priceLabel: "CHF 5 / month",
    shortDescription: "Access to all free and paid events.",
    benefits: [
      "Join all free and paid events",
      "Perfect for active students on campus",
      "Simple monthly access",
    ],
  },
  {
    key: "belong",
    name: "Belong",
    priceLabel: "CHF 25 / month",
    shortDescription: "Access plus CHF 5 off paid events.",
    benefits: [
      "Join all free and paid events",
      "Receive CHF 5 off every paid event",
      "Best value for frequent attendees",
    ],
  },
];

export function normalizeMembershipTier(value: string | null | undefined): MembershipTier {
  if (value === "connect" || value === "belong") {
    return value;
  }

  return "discover";
}

export function formatMembershipTierLabel(tier: string | null | undefined) {
  return normalizeMembershipTier(tier).replace(/^./, (character) => character.toUpperCase());
}

export function getMembershipDiscount(tier: string | null | undefined) {
  return normalizeMembershipTier(tier) === "belong" ? 5 : 0;
}

export function getPayableAmount(entryFee: number | null | undefined, tier: string | null | undefined) {
  const amount = Number(entryFee ?? 0);
  return Math.max(0, amount - getMembershipDiscount(tier));
}
