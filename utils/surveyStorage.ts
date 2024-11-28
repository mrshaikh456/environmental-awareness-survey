export async function saveResponses(responses: Record<number, string>) {
  try {
    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responses),
    });
    if (!response.ok) {
      throw new Error('Failed to save responses');
    }
    return response.json();
  } catch (error) {
    console.error('Error saving responses:', error);
    throw error;
  }
}

export async function getAllResponses(): Promise<Record<number, string>[]> {
  try {
    const response = await fetch('/api/survey');
    if (!response.ok) {
      throw new Error('Failed to fetch responses');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
}

export async function hasSubmitted(): Promise<boolean> {
  try {
    const responses = await getAllResponses();
    return responses.length > 0;
  } catch (error) {
    console.error('Error checking submission status:', error);
    return false;
  }
}

