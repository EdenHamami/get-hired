const { Configuration, OpenAIApi } = require("openai");

module.exports = function configureServer(app) {
  app.post('/Portfolio', async (req, res) => {
    console.log('inside')
    const { question } = req.body;
    const configuration = new Configuration({
      organization: "org-9dFYZrQaxgLw73Ht9RyDsz13",
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const prompt = "The user is interested in the field of Machine Learning and is proficient in the following programming languages/tools: JavaScript, React.js, HTML/CSS, Node.js. Theyve specified that they are particularly interested in front end. The main purpose of their portfolio is Personal Interest. Could you please provide a light project idea that would be suitable for their portfolio?"

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: "Hello world" }],
      max_tokens: 64,
    });
    console.log(completion.data.choices[0].message);


  });

};