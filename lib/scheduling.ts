export function calculateNextDueDate(previous: Date, interval: "MONTH" | "YEAR"): Date {
    const next = new Date(previous);

    if (interval === "MONTH") {
        next.setMonth(next.getMonth() + 1);
    } else if (interval === "YEAR") {
        next.setFullYear(next.getFullYear() + 1);
    }

    // Ensure date never exceeds 28th
    if (next.getDate() > 28) {
        next.setDate(28);
    }

    return next;
}

/**
 * Compute the next anchor date for the given fromDate.
 * anchorDay is clamped to 28 to avoid problems with short months.
 * Returns the next calendar date that uses the anchorDay and is strictly after fromDate.
 */
export function nextAnchorDate(fromDate: Date, interval: "MONTH" | "YEAR", anchorDay?: number): Date {
    const day = Math.min(28, anchorDay ?? fromDate.getDate());

    // Start by building a candidate in the same month
    let year = fromDate.getFullYear();
    let month = fromDate.getMonth();

    const makeCandidate = (y: number, m: number) => {
        const lastDay = new Date(y, m + 1, 0).getDate();
        const d = Math.min(day, lastDay);
        return new Date(y, m, d, 0, 0, 0, 0);
    };

    let candidate = makeCandidate(year, month);

    // If candidate is not strictly after fromDate, advance by one interval
    if (candidate <= fromDate) {
        if (interval === "MONTH") {
            month += 1;
            if (month > 11) {
                month = 0;
                year += 1;
            }
        } else {
            year += 1;
        }
        candidate = makeCandidate(year, month);
    }

    return candidate;
}
