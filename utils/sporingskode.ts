// Vipps reference: maks 50 tegn, kun A-Z, 0-9, - og _

const MAX_LEN = 50;

const slug = (s: string) =>
    s
        .toLowerCase()
        .replace(/æ/g, "ae")
        .replace(/ø/g, "oe")
        .replace(/å/g, "aa")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export type SponsorChild = { id: string | number; name: string };

export function buildSporingskode(barn: SponsorChild): string {
    const kode = `fadder-${slug(String(barn.id))}`;
    return kode.slice(0, MAX_LEN);
}

export const SPORING_FORSLAG = "fadder-forslag";
export const SPORING_GENERELL = "fadder-generell";