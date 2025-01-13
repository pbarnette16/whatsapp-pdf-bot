// Provides logging utilities
const fs = require("fs");

function logInfo(message, data) {
  if (process.env.LOG_LEVEL === "info") {
    console.log(message, data || "");
  }
}

function logError(message, data) {
  console.error(message, data || "");
}

module.exports = { logInfo, logError };
