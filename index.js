const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors')
const { spawn } = require('child_process');
const Jobs = require('./models/Jobs');
const User = require('./models/User');

const app = express();
const port = 3000;
// app.use(express.static(path.join(__dirname, 'output')));

mongoose.connect('mongodb+srv://mihir:mihir@cluster0.ssu46.mongodb.net/Resume?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database');
}).catch(err => console.log(err));

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const job_id = req.body.job_id;
        const dir = `./output/${job_id}`;
        console.log(req.body);
        fs.mkdirSync(dir, { recursive: true })
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Function to call Python script
function runPythonScript(scriptPath, args) {
    return new Promise((resolve, reject) => {
        const python = spawn('python', [scriptPath].concat(args));

        let output = '';

        python.stdout.on('data', (data) => {
            output += data.toString();
        });

        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        python.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}`));
            } else {
                resolve(output);
            }
        });
    });
}

app.use(express.static(path.join(__dirname, './frontend/build')));
app.use(express.static(path.join(__dirname, 'output')));

// Initialize Multer middleware
const upload = multer({ storage: storage });
require('./routes')(app, upload, runPythonScript);

app.post('/api/application/apply', upload.fields([{
    name: 'resume'
}]), async function (req, res) {
    try {
        const { gh, lc, cf, user_id, job_id } = req.body;
        console.log(user_id, job_id);
        const job = await Jobs.findById(job_id);
        if (!job) {
            res.status(200).json({ success: false, err: 'Job not found' });
            return;
        }
        const user = await User.findById(user_id);
        if (!user) {
            res.status(200).json({ success: false, err: 'User not found' });
            return;
        }
        const desc = job.jobDescription;
        fs.writeFileSync('output/desc.txt', desc, 'utf8');
        console.log('File 1 saved at:', req.files['resume'][0].path);
        let data = await runPythonScript('resume-scorer/main.py', ['./output/desc.txt', './' + req.files['resume'][0].path, gh, cf, lc])
        console.log(data);
        data = Number(data);
        console.log(data);
        const application = await Application.create({ jobId: job_id, userId: user_id, score: data, resume: req.files['resume'][0].path, gh: gh, lc: lc, cf: cf });
        application.score = undefined;
        res.status(200).json({ success: true, application });
    } catch (err) {
        console.log(err)
        res.json({ success: false, err });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
