// Entry point of the application
require("dotenv").config();

const router = require("./router");
const { logInfo, logError } = require("./utils/logger");

const PORT = process.env.PORT || 8080;


export default {
// Start server
 async fetch(request, env) {
  try {
    const { method, url } = request;

    logInfo(`Incoming request: ${method} ${url}`);

    const response = await routeMessage(event.request);
    return new Response(response);
  } catch (error) {
    logError(`Unhandled Error: ${error.message}`, { stack: error.stack });
    return new Response('Internal Server Error', { status: 500 });
  }
}
}

