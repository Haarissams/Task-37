const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;


const folderPath = path.join(__dirname, 'files');


if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

// API to create a text file with the current timestamp
app.post('/api/create-timestamp', (req, res) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-'); 
    const fileName = `${timestamp}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating file', error: err });
        }
        res.status(200).json({ message: 'File created successfully', fileName });
    });
});

// API to retrieve all text files in the 'files' folder
app.get('/api/files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading folder', error: err });
        }
        res.status(200).json({ message: 'Files retrieved successfully', files });
    });
});

app.get('/', (req, res) => {
    res.send('A server is working good !');
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
