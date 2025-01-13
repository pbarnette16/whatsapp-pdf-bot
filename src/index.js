require("dotenv").config();
const express = require("express");
const router = require("./router");
const { logInfo, logError } = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(router);

// Start server
app.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
});
