const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 5000;

const allowedOrigins = [
    "https://spam-email-detection-clientside.vercel.app",
    "http://localhost:5173" // for local development
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json("hello ");
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
        return res.json({ prediction: data.toString() });
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




// // Import the express module to create an Express application
// const express = require('express');

// // Import body-parser to parse incoming request bodies in a middleware
// const bodyParser = require('body-parser');

// // Import cors to allow Cross-Origin Resource Sharing
// const cors = require('cors');

// // Import spawn from the child_process module to spawn a new process
// const { spawn } = require('child_process');

// // Import path to handle and transform file paths
// const path = require('path');

// // Create an instance of an Express application
// const app = express();

// // Define the port number the server will listen on
// const port = 5000;

// // Use the cors middleware to enable Cross-Origin Resource Sharing
// app.use(cors());

// // Use the body-parser middleware to parse JSON request bodies
// app.use(bodyParser.json());

// // Define a POST route at the endpoint '/predict'
// app.post('/predict', (req, res) => {
//     // Extract the 'message' from the request body
//     const { message } = req.body;

//     // Spawn a new Python process to run the predict.py script, passing the message as an argument
//     const pythonProcess = spawn('python', [path.join(__dirname, 'predict.py'), message]);

//     // When the Python process outputs data, send it back in the response
//     pythonProcess.stdout.on('data', (data) => {
//         res.json({ prediction: data.toString() });
//     });

//     // If the Python process encounters an error, log it to the console
//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     // When the Python process exits, log the exit code to the console
//     pythonProcess.on('close', (code) => {
//         console.log(`child process exited with code ${code}`);
//     });
// });

// // Start the server and listen on the specified port, logging a message to the console
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
