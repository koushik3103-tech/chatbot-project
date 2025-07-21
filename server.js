const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const COHERE_API_KEY = '4tpxHwuXCDfwA2SOX0pFaWLcCSbZEIuSFfsjhb3I'; // Replace with your actual Cohere key

app.post('/ask', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        message,
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

app.listen(31, () => {
  console.log('Server running at http://koushikchatbot:31');
});