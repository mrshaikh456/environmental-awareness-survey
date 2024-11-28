import { sql } from '@vercel/postgres';

export async function setupDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        device_id TEXT NOT NULL,
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

