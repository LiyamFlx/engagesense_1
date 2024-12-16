const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static('public'));

app.post('/analyze', upload.single('audio'), (req, res) => {
    const python = spawn('python3', ['scripts/sentiment_analysis.py']);
    let result = '';
    python.stdout.on('data', data => result += data);
    python.on('close', () => res.send(JSON.parse(result)));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));