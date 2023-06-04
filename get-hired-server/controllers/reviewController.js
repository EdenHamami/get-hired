const express = require('express');
const axios = require('axios');

module.exports = (app) => {
    app.post('/api/gpt-review', async (req, res) => {
        try {
            const question = req.body.question;
            const code = req.body.code;
            const reviewPrompt = `Question: ${question}\n\nCode:\n${code}\n\nGive me 3 comments about this code to improve.`;

            const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "text-davinci-003", // change this to your actual model
                messages: [{
                    role: 'user', 
                    content: reviewPrompt
                }]
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            });

            res.json(gptResponse.data.choices[0].message.content);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while trying to communicate with the GPT-3 API.' });
        }
    });
};
