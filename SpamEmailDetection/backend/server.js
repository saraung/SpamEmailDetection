const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
    "https://your-frontend-domain.vercel.app", // Replace with your actual frontend domain
    "http://localhost:5173" // For local development
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello from the backend!");
});

app.post('/predict', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).send("Can't Predict Empty Field");
    }

    console.log(`Received message: ${message}`);

    const pythonProcess = spawn('python', [path.join(__dirname, 'predict.py'), message]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data.toString()}`);
        return res.json({ prediction: data.toString().trim() });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data.toString()}`);
        return res.status(500).send(`Error during prediction: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        if (code !== 0) {
            return res.status(500).send("Error during prediction");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
