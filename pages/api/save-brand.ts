import type { NextApiRequest, NextApiResponse } from "next";

let store: Record<string, any> = {}; // in-memory for demo; swap with DB

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const tokens = req.body;
    const slug = Math.random().toString(36).substring(2, 8);
    store[slug] = tokens;
    return res.status(200).json({ slug });
  }
  if (req.method === "GET") {
    const { slug } = req.query;
    return res.status(200).json(store[slug as string] || null);
  }
  res.status(405).end();
}