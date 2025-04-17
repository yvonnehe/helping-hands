import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { reference } = req.query;

    if (typeof reference !== 'string') {
        return res.status(400).json({ error: 'Invalid reference' });
    }

    const agreementId = await kv.get(reference);

    if (!agreementId) {
        return res.status(404).json({ error: 'Agreement ID not found' });
    }

    res.status(200).json({ agreementId });
}
// This API endpoint retrieves the agreement ID associated with a given reference.
// It uses the Vercel KV database to look up the agreement ID based on the reference provided in the query parameters.
// If the reference is not found, it returns a 404 error.