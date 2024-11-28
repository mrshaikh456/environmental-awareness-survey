import { sql } from '@vercel/postgres';
import { setupDatabase } from './setupDatabase';

async function ensureTableExists() {
  await setupDatabase();
}

export async function saveResponses(responses: Record<number, string>) {
  try {
    await ensureTableExists();
    await sql`INSERT INTO responses (data) VALUES (${JSON.stringify(responses)})`;
    return { success: true };
  } catch (error) {
    console.error('Error saving responses:', error);
    throw error;
  }
}

export async function getAllResponses(): Promise<Record<number, string>[]> {
  try {
    await ensureTableExists();
    const result = await sql`SELECT * FROM responses`;
    return result.rows.map(row => row.data);
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
}

export async function hasSubmitted(): Promise<boolean> {
  try {
    await ensureTableExists();
    const result = await sql`SELECT COUNT(*) FROM responses`;
    return parseInt(result.rows[0].count) > 0;
  } catch (error) {
    console.error('Error checking submission status:', error);
    return false;
  }
}

