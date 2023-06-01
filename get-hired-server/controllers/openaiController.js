const { Configuration, OpenAIApi } = require("openai");

module.exports = function configureServer(app) {
  app.post('/Portfolio', async (req, res) => {
    console.log('inside')
    const { question } = req.body;
    console.log(question)
    const configuration = new Configuration({
      organization: "org-yFQucKMEr6u0nULdEMcYtB6v",
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const prompt = "The user is interested in the field of Machine Learning and is proficient in the following programming languages/tools: JavaScript, React.js, HTML/CSS, Node.js. Theyve specified that they are particularly interested in front end. The main purpose of their portfolio is Personal Interest. Could you please provide a light project idea that would be suitable for their portfolio?"

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 64,
    });
    console.log(completion.data.choices[0].message);
    return res.status(200).json({ message: completion.data.choices[0].message });

  });

};