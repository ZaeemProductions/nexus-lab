const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();

// Security: Only allow requests from your Firebase Aether OS
app.use(cors({
    origin: 'https://aether-lab.web.app'
}));

app.get('/api/rip', async (req, res) => {
    try {
        const videoUrl = req.query.url;
        
        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).send('Invalid Target URI');
        }

        const info = await ytdl.getInfo(videoUrl);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, ''); 

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(videoUrl, { format: 'mp4', quality: 'highest' }).pipe(res);
        
    } catch (error) {
        console.error('[AETHER BACKEND] Extraction Error:', error.message);
        res.status(500).send('Extraction Matrix Failed');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[AETHER BACKEND] Node execution thread live on port ${PORT}`);
});
