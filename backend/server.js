const express = require('express');
const cors = require('cors');
const play = require('play-dl');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 🟢 Keep-Alive Route for cron-job.org
app.get('/ping', (req, res) => {
  res.status(200).send('Pong! Aether Backend is wide awake.');
});

// 🔴 The Stealth Extraction Matrix
app.get('/api/rip', async (req, res) => {
  try {
    const videoUrl = req.query.url; 
    
    if (!videoUrl) {
      return res.status(400).send('Extraction Matrix Error: No video URL provided.');
    }

    // Tell the browser to download the file
    res.header('Content-Disposition', 'attachment; filename="Aether_Extraction.mp4"');
    
    // Fetch the stream using the stealthier play-dl package
    const stream = await play.stream(videoUrl);
    
    // Pipe the stream directly to the client
    stream.stream.pipe(res);

  } catch (error) {
    console.error('Extraction error:', error.message);
    if (!res.headersSent) {
      res.status(500).send(`Extraction Matrix Failed: ${error.message}`);
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Aether Backend running on port ${PORT}`);
});
