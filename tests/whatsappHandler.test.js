const { handleMessage } = require('../src/services/whatsappHandler');
const { processPDF } = require('../src/services/pdfProcessingService');
const { updateGoogleCalendar } = require('../src/services/calendarService');

jest.mock('../src/services/pdfProcessingService');
jest.mock('../src/services/calendarService');

describe('WhatsApp Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should process PDF messages', async () => {
    const mockMessage = { type: 'pdf', file: 'mock-file.pdf' };
    const mockEventDetails = { date: '2025-01-20', time: '10:00', class: '1/2c', description: 'School Play' };

    processPDF.mockResolvedValue(mockEventDetails);
    updateGoogleCalendar.mockResolvedValue();

    await handleMessage(mockMessage);

    expect(processPDF).toHaveBeenCalledWith(mockMessage.file);
    expect(updateGoogleCalendar).toHaveBeenCalledWith(mockEventDetails);
  });

  test('should process text messages', async () => {
    const mockMessage = { type: 'text', text: 'Event details' };

    await handleMessage(mockMessage);

    expect(updateGoogleCalendar).toHaveBeenCalledWith(mockMessage.text);
  });

  test('should throw error for unsupported message types', async () => {
    const mockMessage = { type: 'image' };

    await expect(handleMessage(mockMessage)).rejects.toThrow('Unsupported message type');
  });
});
