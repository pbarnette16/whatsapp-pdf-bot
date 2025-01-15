// Extracts event details from PDFs
// const pdf = require("pdf-parse");
const {extractEventDetails} = require("./openaiHandler");
const { logInfo, logError } = require("../utils/logger");

async function processPDF(file) {
  try {
    logInfo(`Received file for processing: ${file.name}, uploaded at ${new Date().toISOString()}`);
    
    // Simulate file upload to a temporary storage (e.g., in-memory or a Cloudflare KV store)
    const temporaryStorage = {}; 
    temporaryStorage[file.name] = file;

    const pdfText = await extractText(file); // Parse the PDF content
    // Example: "Class: 1/2c, Event: School Play, Date: 2025-01-20"
    // { date: "2025-01-20", time: "10:00", class: "1/2c", description: "School Play", term: "Term 4" };
    const events = await extractEventDetails(pdfText);

    // Clean up the temporary storage
    delete temporaryStorage[file.name];
    logInfo(`Cleaned up temporary file: ${file.name}`);

    return events;
  } catch (error) {
    logError(`Error processing PDF file: ${error.message}`);
    throw error; // Propagate error for the handler to manage
  }
}




module.exports = { processPDF };
