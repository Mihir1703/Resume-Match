const Router = require('express').Router();
const Jobs = require('../models/Jobs');
const Application = require('../models/Application');

// Path: routes/Application.js

Router.post('/create', async (req, res) => {
    console.log(req.body);
    const { userId, jobTitle, companyName, jobDescription, jobLocation, jobType } = req.body;
    try {
        const job = await Jobs.create({ userId, jobTitle, companyName, jobDescription, jobLocation, jobType });
        res.status(200).json({ success: true, job });
    } catch (err) {
        res.status(200).json({ success: false, err });
    }
});

Router.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Jobs.findById(id);
        res.status(200).json({ success: true, job });
    } catch (err) {
        res.status(200).json({ success: false, err });
    }
});

Router.post('/getall', async (req, res) => {
    const { userId } = req.body;
    try {
        let applications = await Application.find({ userId: userId });
        applications = applications.map((application) => application.jobId.toString());
        const jobs = await Jobs.find({
            _id: {
                $nin: applications
            }
        });
        res.status(200).json({ success: true, jobs });
    } catch (err) {
        res.status(200).json({ success: false, err });
    }
});

Router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { jobTitle, companyName, jobDescription, jobLocation, jobType } = req.body;
    try {
        const job = await Jobs.findByIdAndUpdate(id, { jobTitle, companyName, jobDescription, jobLocation, jobType });
        res.status(200).json({ success: true, job });
    } catch (err) {
        res.status(200).json({ success: false, err });
    }
});

Router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Jobs.findByIdAndDelete(id);
        res.status(200).json({ success: true, job });
    } catch (err) {
        res.status(200).json({ success: false, err });
    }
});

module.exports = Router;