import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/send-whatsapp", async (req, res) => {
  const { phoneNumber, message } = req.body;

  const accountSid = "AC9b1f43503e463de83b7a27d43caea5dd";
  const authToken = "b307e5c9c70c2b81bc56d2a3ae17455e";
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  try {
    const response = await axios.post(
      url,
      new URLSearchParams({
        To: `whatsapp:${+phoneNumber}`,
        From: "whatsapp:+14155238886",
        Body: message,
      }),
      {
        auth: {
          username: accountSid,
          password: authToken,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    res.status(200).send(`Message sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Failed to send message to ${phoneNumber}:`, error);
    res.status(500).send(`Failed to send message to ${phoneNumber}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
