const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors')
const { spawn } = require('child_process');
const User = require('./models/User');
const Jobs = require('./models/Jobs');
const Application = require('./models/Application');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://mihir:mihir@cluster0.ssu46.mongodb.net/Resume?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database');
}).catch(err => console.log(err));

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './output/');
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

// Initialize Multer middleware
const upload = multer({ storage: storage });

app.post('/createUser', async (req, res) => {
    try {
        let { name, email, password } = req.body

        let user = new User({
            name,
            email,
            password
        })
        await user.save()
        res.send(user._id)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

app.post('login', async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await User.findOne({ email: email })
        if (data.password === password) {
            res.send(data._id)
        } else {
            res.send('Incorrect password')
        }
    } catch (err) {
        res.send(err)
    }
})

app.post('/createJob', async (req, res) => {
    const { userId, jobTitle, companyName, jobDescription, jobLocation, jobType } = req.body
    const user = await User.findOne({ _id: userId })
    if (user) {
        let job = new Jobs({
            userId,
            jobTitle,
            companyName,
            jobDescription,
            jobLocation,
            jobType
        })
        await job.save()
        return res.send('Job created')
    }
    return res.send('User not found')
})

app.get('/getJobs', async (req, res) => {
    const data = await Jobs.find()
    res.send(data)
})

app.get('/getJob/:id', async (req, res) => {
    const data = await Jobs.findOne({ _id: req.params.id })
    res.send(data)
})

app.post('/my_appplied_jobs', async (req, res) => {
    const { userId } = req.body
    const data = await Jobs.find({ userId: userId })
    res.send(data)
})

app.post('/my_posted_jobs', async (req, res) => {
    const { userId } = req.body
    const data = await Jobs.find({ userId: userId })
    res.send(data)
})

app.post('/my_posted/:id', async (req, res) => {
    const { userId } = req.body
    const data = await Jobs.findOne({ userId: userId, _id: req.params.id })
    const applied = await Application.findOne({ jobId: req.params.id })
    if (applied && data) {
        res.send(applied)
    }
    res.send("data not found")
})

// POST request handler
app.post('/apply/:id', upload.fields([{ name: 'resume' }]), async function (req, res) {
    // Extract variables from request body
    try{
        let jobs = await Jobs.findOne({ _id: req.params.id })
    if (!jobs) {
        return res.send('Job not found')
    }
    const { desc, gh, lc, cf } = req.body;

    fs.writeFileSync('output/desc.txt', desc, 'utf8');
    // Log paths of saved files to console
    console.log('File 1 saved at:', req.files['resume'][0].path);
    console.log('../' + req.files['resume'][0].path)
    let data = await runPythonScript('resume-scorer/main.py', ['./output/desc.txt', './' + req.files['resume'][0].path, gh, cf, lc])
    const info = new Application({
        JobId: req.params.id,
        resume: req.files['resume'][0].path,
        score: data,
        gh,
        lc,
        cf
    })
    await info.save()
    res.send('Applied Successfully' + data);
    }catch(err){
        console.log(err)
        res.send(err)
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
