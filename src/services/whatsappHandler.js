const { processPDF } = require("./pdfProcessingService");
const { updateGoogleCalendar } = require("./calendarService");
const { logInfo, logError } = require("../utils/logger");

async function handleMessage(message) {
  try {
    if (message.type === "pdf") {
      const file = message.file;
      const eventDetails = await processPDF(file);
      await updateGoogleCalendar(eventDetails);
      logInfo("PDF message processed successfully", { file });
    } else if (message.type === "text") {
      await updateGoogleCalendar(message.text);
    } else {
      throw new Error("Unsupported message type");
    }
  } catch (error) {
    logError("Error handling message", { error });
  }
}

module.exports = { handleMessage };
