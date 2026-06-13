// Donasjonsnummeret er det gamle Vipps-nummeret som nå ligger på Donasjoner.
const DONASJONSNUMMER = "13947";

// Portalen genererer lenker på formen qr.vipps.no/donations/<nr>?reference=<kode>
export function buildDonasjonerLenke(reference: string): string {
    const base = `https://qr.vipps.no/donations/${DONASJONSNUMMER}`;
    return `${base}?reference=${encodeURIComponent(reference)}`;
}