// Handles WhatsApp message processing
const { processPDF } = require("./pdfProcessingService");
const { updateGoogleCalendar } = require("./calendarService");
import { extractEventDetails } from '../services/openaiHandler';
const { logInfo, logError } = require("../utils/logger");

async function handleMessage(message) {
  try {
    let events;
    if (message.type === "pdf") {
      logInfo(`Processing PDF message: ${message.file.name}`);
      const file = message.file;
      const eventDetails = await processPDF(file);
      
      logInfo("PDF message processed successfully", { file });
    } else if (message.type === "text") {
      logInfo(`Processing text message: "${message.text}"`);
      events = await extractEventDetails(message.text);
      
    } else {
      throw new Error("Unsupported message type");
    }

    if (events) {
      await updateGoogleCalendar(events);
      return new Response('Message processed successfully');
    } else {
      logError('No events extracted from message');
      return new Response('No events found to process', { status: 400 });
    }


  } catch (error) {
    logError(`Error processing message: ${error.message}`, { stack: error.stack });
    return new Response('Error processing message', { status: 500 });
  }
}

module.exports = { handleMessage };
