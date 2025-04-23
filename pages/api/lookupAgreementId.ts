import { tempStore } from "../../lib/tempStore";

export default async function handler(req, res) {
    const { reference } = req.query;

    if (typeof reference !== "string") {
        return res.status(400).json({ error: "Invalid reference" });
    }

    const agreementId = tempStore.get(reference);

    if (!agreementId) {
        return res.status(404).json({ error: "Agreement ID not found" });
    }

    res.status(200).json({ agreementId });
}
