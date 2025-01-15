// Handles routing of WhatsApp messages and bot actions
const { handleMessage } = require("./services/whatsappHandler");
const { logInfo } = require("./utils/logger");

const router = express.Router();

router.post("/webhook", async (req, res) => {
  try {
    const message = req.body;
    await handleMessage(message);
    res.status(200).send("Message processed successfully");
  } catch (error) {
    logInfo("Unsupported message type", { type: req.body?.type });
    res.status(400).send("Error processing message");
  }
});

module.exports = router;
