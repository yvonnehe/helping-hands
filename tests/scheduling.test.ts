import { describe, it, expect } from 'vitest';
import { nextAnchorDate, calculateNextDueDate } from '../lib/scheduling';

describe('scheduling helpers', () => {
    it('nextAnchorDate advances monthly anchors correctly', () => {
        const from = new Date('2026-01-17T00:00:00Z');
        const next = nextAnchorDate(from, 'MONTH', 17);
        expect(next.toISOString().split('T')[0]).toBe('2026-02-17');
    });

    it('nextAnchorDate clamps anchors >28 to 28 and advances across month boundary', () => {
        const from = new Date('2026-01-31T00:00:00Z');
        const next = nextAnchorDate(from, 'MONTH', 31);
        // anchorDay 31 is clamped to 28, so next month date should be Feb 28
        expect(next.toISOString().split('T')[0]).toBe('2026-02-28');
    });

    it('nextAnchorDate with yearly interval advances by year', () => {
        const from = new Date('2026-06-15T00:00:00Z');
        const next = nextAnchorDate(from, 'YEAR', 15);
        expect(next.toISOString().split('T')[0]).toBe('2027-06-15');
    });

    it('calculateNextDueDate advances and clamps correctly', () => {
        const prev = new Date('2026-01-31T00:00:00Z');
        const next = calculateNextDueDate(prev, 'MONTH');
        expect(next.toISOString().split('T')[0]).toBe('2026-02-28');
    });
});
