// Interacts with Google Calendar API
const { google } = require("@googleapis/calendar");
const { logInfo, logError } = require("../utils/logger");

async function updateGoogleCalendar(eventDetails) {

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  for (const event of events) {
    const { title, startTime, endTime, location, description, class: className } = event;
    try {
    
      // Check if event exists
      const existingEvent = await findEvent(calendar, title, startTime, calendarId);
  
        if (existingEvent) {
          await calendar.events.update({
            calendarId,
            eventId: existingEvent.id,
            requestBody: { summary: title, start: startTime, end: endTime, location },
          });
          logInfo("Updated event:", { title });
        } else {
  
      const { date, time, class: className, description } = eventDetails;
      const startTime = `${date}T${time}:00`;
      const endTime = `${date}T${time + 1}:00`;
      const reminderTime = process.env.REMINDER_OFFSET_DAYS * 24 * 60;
  
      const event = {
        summary: `Class: ${className}`,
        description,
        start: { dateTime: startTime, timeZone: "UTC" },
        end: { dateTime: endTime, timeZone: "UTC" },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: reminderTime },
            { method: "popup", minutes: reminderTime },
          ],
        },
        metadata: {
          className,
          createdAt: new Date().toISOString(),
        },
      };
  
      await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        resource: event,
      });
  
      logInfo("Created event", { event });
    }
    } catch (error) {
      logError("Error updating Google Calendar", { error });
      throw error;
    }
  }

 
}

module.exports = { updateGoogleCalendar };
