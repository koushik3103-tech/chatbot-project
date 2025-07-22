const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 31;

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// ✅ Your Cohere API Key
const COHERE_API_KEY = '4tpxHwuXCDfwA2SOX0pFaWLcCSbZEIuSFfsjhb3I';  // ⚠️ Move this to .env in production

// ✅ Personality-Aware Endpoint
app.post('/ask', async (req, res) => {
  const { message, personality } = req.body;

  let instruction = '';
  switch (personality) {
    case 'sarcastic':
      instruction = "Respond in a sarcastic, witty tone.";
      break;
    case 'motivational':
      instruction = "Respond like a motivational coach with uplifting vibes.";
      break;
    case 'funny':
      instruction = "Respond humorously with jokes and casual tone.";
      break;
    default:
      instruction = "Respond in a friendly, helpful way.";
  }

  const fullPrompt = `${instruction} ${message}`;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        message: fullPrompt,
        model: "command-r-plus",
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ reply: response.data.text });
  } catch (error) {
    console.error('❗ API Error:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Something went wrong with Kutty AI.' });
  }
});

// ✅ Start Server
app.listen(31, () => console.log(`✅ Server running at http://koushikchatbot:${31}`));
