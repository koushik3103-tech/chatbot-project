const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 31;

// ✅ Middleware Setup
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// ✅ Cohere API Key (Secure this in env in production!)
const COHERE_API_KEY = '4tpxHwuXCDfwA2SOX0pFaWLcCSbZEIuSFfsjhb3I';

// ✅ Personality Chat Endpoint
app.post('/ask', async (req, res) => {
  const { message, personality } = req.body;

  // ✅ Personalization Logic
  let personalityInstruction = '';
  switch (personality) {
    case 'sarcastic':
      personalityInstruction = "Respond in a sarcastic and witty tone.";
      break;
    case 'motivational':
      personalityInstruction = "Respond like a motivational coach, very encouraging and uplifting.";
      break;
    case 'funny':
      personalityInstruction = "Respond humorously with jokes and light-hearted comments.";
      break;
    default:
      personalityInstruction = "Respond in a friendly, helpful, and easy-to-understand way.";
  }

  // ✅ Full prompt with personality included
  const fullPrompt = `${personalityInstruction} ${message}`;

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
          'Authorization': 'Bearer ' + COHERE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.text;
    res.json({ reply });
  } catch (error) {
    console.error('Cohere API error:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Something went wrong with Cohere API.' });
  }
});

// ✅ Server Listening
app.listen(31, () => {
  console.log(`✅ Server running at http://koushikchatbot:${31}`);
});
