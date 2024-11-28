import { createPool, sql } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL
});

export async function saveResponses(responses: Record<number, string>) {
  try {
    await pool.sql`INSERT INTO responses (data) VALUES (${JSON.stringify(responses)})`;
    return { success: true };
  } catch (error) {
    console.error('Error saving responses:', error);
    throw error;
  }
}

export async function getAllResponses(): Promise<Record<number, string>[]> {
  try {
    const result = await pool.sql`SELECT * FROM responses`;
    return result.rows.map(row => row.data);
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
}

export async function hasSubmitted(): Promise<boolean> {
  try {
    const result = await pool.sql`SELECT COUNT(*) FROM responses`;
    return parseInt(result.rows[0].count) > 0;
  } catch (error) {
    console.error('Error checking submission status:', error);
    return false;
  }
}

