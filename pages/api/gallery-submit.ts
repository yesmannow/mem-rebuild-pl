import type { NextApiRequest, NextApiResponse } from "next";

let gallery: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { url, tokens } = req.body;
    gallery.push({ url, tokens, created: Date.now() });
    return res.status(200).json({ success: true });
  }
  if (req.method === "GET") {
    return res.status(200).json(gallery);
  }
  res.status(405).end();
}