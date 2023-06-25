const { Configuration, OpenAIApi } = require("openai");
const { apiKey, organization } = require("../credentials");
module.exports = function configureServer(app) {
  app.post('/askGpt', async (req, res) => {
    const { question } = req.body;
    const configuration = new Configuration({
      organization: organization,
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 1000,
    });
    return res.status(200).json({ message: completion.data.choices[0].message });

  });

};