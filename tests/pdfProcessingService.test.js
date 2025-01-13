const { processPDF, extractEventDetails } = require('../src/services/pdfProcessingService');
const pdf = require('pdf-parse');

jest.mock('pdf-parse');

describe('PDF Processing Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should extract event details from PDF', async () => {
    const mockFile = 'mock-file.pdf';
    const mockPDFData = { text: 'Class: 1/2c, Event: School Play, Date: 2025-01-20' };
    const expectedDetails = { date: '2025-01-20', time: '10:00', class: '1/2c', description: 'School Play' };

    pdf.mockResolvedValue(mockPDFData);

    const eventDetails = await processPDF(mockFile);

    expect(pdf).toHaveBeenCalledWith(mockFile);
    expect(eventDetails).toEqual(expectedDetails);
  });

  test('should throw error for invalid PDF', async () => {
    const mockFile = 'invalid-file.pdf';

    pdf.mockRejectedValue(new Error('Invalid PDF'));

    await expect(processPDF(mockFile)).rejects.toThrow('Invalid PDF');
  });
});
