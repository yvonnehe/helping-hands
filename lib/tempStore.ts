// lib/tempStore.ts

type AgreementStore = Map<string, string>;
const store: AgreementStore = new Map();

export const tempStore = {
    set: (key: string, value: string) => {
        store.set(key, value);
        // Auto-expire after 10 minutes
        setTimeout(() => store.delete(key), 10 * 60 * 1000);
    },
    get: (key: string) => store.get(key),
    delete: (key: string) => store.delete(key),
};
