import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export async function saveResponses(responses: Record<number, string>) {
  try {
    let deviceId = localStorage.getItem('surveyDeviceId');
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem('surveyDeviceId', deviceId);
    }

    await sql`
      INSERT INTO responses (device_id, data)
      VALUES (${deviceId}, ${JSON.stringify(responses)})
    `;
    return { success: true };
  } catch (error) {
    console.error('Error saving responses:', error);
    throw error;
  }
}

export async function getAllResponses(): Promise<Record<number, string>[]> {
  try {
    const result = await sql`SELECT * FROM responses`;
    return result.rows.map(row => row.data);
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
}

export async function hasSubmitted(): Promise<boolean> {
  try {
    const deviceId = localStorage.getItem('surveyDeviceId');
    if (!deviceId) return false;

    const result = await sql`
      SELECT COUNT(*) FROM responses WHERE device_id = ${deviceId}
    `;
    return parseInt(result.rows[0].count) > 0;
  } catch (error) {
    console.error('Error checking submission status:', error);
    return false;
  }
}

