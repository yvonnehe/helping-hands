import { tempStore } from "../../lib/tempStore";

export default async function handler(req, res) {
    const { reference } = req.body;
    tempStore.delete(reference);
    res.status(200).json({ message: "Reference cleaned up" });
}
