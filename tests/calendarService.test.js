const { updateGoogleCalendar } = require('../src/services/calendarService');
const { google } = require('@googleapis/calendar');

jest.mock('@googleapis/calendar');

describe('Calendar Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create an event in Google Calendar', async () => {
    const mockEventDetails = {
      date: '2025-01-20',
      time: '10:00',
      class: '1/2c',
      description: 'School Play',
    };
    const insertMock = jest.fn();
    google.calendar.mockReturnValue({
      events: {
        insert: insertMock,
      },
    });

    await updateGoogleCalendar(mockEventDetails);

    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        resource: expect.objectContaining({
          summary: `Class: ${mockEventDetails.class}`,
        }),
      })
    );
  });
});
