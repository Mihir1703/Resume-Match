const Router = require('express').Router();
const User = require('../models/User');

// Path: routes/User.js

Router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const alreadyExist = await User.findOne({ email });
        if (alreadyExist) {
            return res.status(200).json({ success: false, err: 'User already exists' });
        }
        const user = await User.create({ name, email, password });
        user.password = undefined;
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
});

Router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ success: false, err: 'User not found' });
        }
        const isMatch = (password === user.password);
        if (!isMatch) {
            return res.status(200).json({ success: false, err: 'Incorrect password' });
        }
        user.password = undefined;
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
});

module.exports = Router;