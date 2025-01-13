const { google } = require("@googleapis/calendar");
const { logInfo, logError } = require("../utils/logger");

const auth = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const calendar = google.calendar({ version: "v3", auth });

async function updateGoogleCalendar(eventDetails) {
  try {
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

    logInfo("Event added to Google Calendar", { event });
  } catch (error) {
    logError("Error updating Google Calendar", { error });
    throw error;
  }
}

module.exports = { updateGoogleCalendar };
