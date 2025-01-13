export async function extractEventDetails(text) {
    const prompt = `
  Extract detailed calendar events from the text below. Return the results as a JSON array where each item contains:
  - Title
  - Date
  - Start Time
  - End Time
  - Location
  - Description
  - Class (e.g., "1/2c", "4/5a", or similar)
  
  Text: "${text}"
  `;
  
  try {
    const events = JSON.parse(response.data.choices[0].text);

    // Validate that each event includes a "class" field
    for (const event of events) {
      if (!event.class) {
        throw new Error('Event missing "class" field');
      }
    }

    return events;
  } catch (error) {
    logError(`Error parsing OpenAI response: ${error.message}`);
    throw error;
  }
  }