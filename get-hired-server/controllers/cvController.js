const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'abcde12345eauofn213-e3i9rfnwjfwf';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        console.log('No token provided')
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(token)
            console.log('Failed to authenticate token')
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.user = decoded.userId;
        next();
    });
};


module.exports = function configureServer(app) {


    app.post('/saveCvData', verifyToken, async (req, res) => {
        try {
            var userId;
            try {
                userId = req.user[0]._id;
            } catch {
                userId = req.user._id;
            }

            const {
                personalInfo, workExperience, education, skills, summary
            } = req.body;

            const updatedFields = {
                personalInfo,
                workExperience,
                education,
                skills,
                summary

            };

            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                updatedFields,
                { new: true }
            );


            return res.status(200).json({ message: 'User data saved successfully' });
        } catch (error) {
            console.error('Error saving user data:', error);
            return res.status(500).json({ error: 'An error occurred while saving user data' });
        }
    });
    app.get('/loadCvData', verifyToken, async (req, res) => {

        try {
            var user = await User.findOne({ _id: req.user[0]._id });
        } catch {

            var user = await User.findOne({ _id: req.user._id });
        }

        try {

            const {
                personalInfo,
                workExperience,
                education,
                skills,
                summary,


            } = user;

            return res.status(200).json({
                personalInfo,
                workExperience,
                education,
                skills,
                summary,

            });
        } catch (error) {
            console.error('Error loading user data:', error);
            return res.status(500).json({ error: 'An error occurred while loading user data' });
        }
    });




};