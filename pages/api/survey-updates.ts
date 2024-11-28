import { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const sendUpdate = async () => {
    try {
      const result = await sql`SELECT * FROM responses`;
      res.write(`data: ${JSON.stringify(result.rows)}\n\n`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const intervalId = setInterval(sendUpdate, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
}

