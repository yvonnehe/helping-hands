// pages/api/cleanupAgreementReference.ts
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { reference } = req.body;

    if (!reference || typeof reference !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid reference' });
    }

    await kv.del(reference);
    res.status(200).json({ message: `Reference "${reference}" cleaned up.` });
}
