const pdf = require("pdf-parse");
const { logInfo, logError } = require("../utils/logger");

async function processPDF(file) {
  try {
    const data = await pdf(file);
    logInfo("PDF processed successfully", { fileName: file.name });
    const eventDetails = extractEventDetails(data.text);
    return eventDetails;
  } catch (error) {
    logError("Error processing PDF", { error });
    throw error;
  }
}

function extractEventDetails(text) {
  return { date: "2025-01-20", time: "10:00", class: "1/2c", description: "School Play" };
}

module.exports = { processPDF };
