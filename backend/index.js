const { sequelize, MeetingAgenda } = require('./db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate-agenda', async (req, res) => {
  console.log('Received request to generate agenda');
  console.log('Request body:', req.body);

  const { title, topics, duration } = req.body;

  if (!title || !topics || !duration) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const prompt = `
You are an AI assistant. Generate a professional meeting agenda given the following inputs:

Meeting Title: ${title}
Topics: ${topics}
Total Duration: ${duration} minutes

Format it cleanly with time allocations and bullet points.
  `;
  console.log('Generated prompt:', prompt);

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',  // Or your preferred supported model
        messages: [
          { role: 'system', content: 'You are an agenda-generating assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response from API:', response.data);

    const agenda = response.data.choices[0].message.content;

    await MeetingAgenda.create({
      title,
      topics,
      duration: parseInt(duration),
      agenda,
      generatedAt: new Date(),
    });

    console.log('Generated agenda:', agenda);
    res.json({ agenda });
  } catch (error) {
    console.error('Error generating agenda:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate agenda' });
  }
});

// ✅ NEW ROUTE: Fetch the last 20 generated agendas
app.get('/api/agendas', async (req, res) => {
  try {
    const agendas = await MeetingAgenda.findAll({
      order: [['generatedAt', 'DESC']],
      limit: 20,
    });
    res.json(agendas);
  } catch (error) {
    console.error('Error fetching agendas:', error.message);
    res.status(500).json({ error: 'Failed to fetch agendas' });
  }
});

// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
