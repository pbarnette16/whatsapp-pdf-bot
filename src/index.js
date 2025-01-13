// Entry point of the application
require("dotenv").config();
const express = require("express");
const router = require("./router");
const { logInfo, logError } = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(router);
app.listen(PORT, () => logInfo(`Server listening on port ${PORT}`));

export default {
// Start server
 async fetch(request, env) {
  try {
    const { method, url } = request;

    logInfo(`Incoming request: ${method} ${url}`);

    const response = await routeMessage(event.request);
    event.respondWith(response);
  } catch (error) {
    logError(`Unhandled Error: ${error.message}`, { stack: error.stack });
    event.respondWith(new Response('Internal Server Error', { status: 500 }));
  }
}
}

