import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres';
import { setupDatabase } from '../../utils/setupDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await setupDatabase();
  if (req.method === 'GET') {
    try {
      const result = await sql`SELECT * FROM responses`;
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch responses' });
    }
  } else if (req.method === 'POST') {
    const newResponse = req.body;
    try {
      await sql`INSERT INTO responses (data) VALUES (${JSON.stringify(newResponse)})`;
      res.status(200).json({ message: 'Response saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save response' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

