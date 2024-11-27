const STORAGE_KEY = 'environmental_survey_responses';

export function saveResponses(responses: Record<number, string>) {
  const existingResponses = getAllResponses();
  existingResponses.push(responses);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingResponses));
}

export function getAllResponses(): Record<number, string>[] {
  const storedResponses = localStorage.getItem(STORAGE_KEY);
  return storedResponses ? JSON.parse(storedResponses) : [];
}

export function hasSubmitted(): boolean {
  return getAllResponses().length > 0;
}

